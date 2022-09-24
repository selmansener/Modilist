using System.Globalization;

using FluentValidation;

using Iyzipay.Model;
using Iyzipay.Request;

using Mapster;

using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.PaymentDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Configurations;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using IyzicoPayment = Iyzipay.Model.Payment;

namespace Modilist.Business.CQRS.PaymentDomain.Commands
{
    public class CreatePayment : IRequest<PaymentDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }
    }

    internal class CreatePaymentValidator : AbstractValidator<CreatePayment>
    {
        public CreatePaymentValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
        }
    }

    internal class CreatePaymentHandler : IRequestHandler<CreatePayment, PaymentDTO>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPaymentRepository _paymentRepository;
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;
        private readonly ILogger<CreatePaymentHandler> _logger;


        public CreatePaymentHandler(
            IHttpContextAccessor httpContextAccessor,
            IPaymentRepository paymentRepository,
            ISalesOrderRepository salesOrderRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IAccountRepository accountRepository,
            IOptions<IyzicoAPIOptions> options,
            ILogger<CreatePaymentHandler> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _paymentRepository = paymentRepository;
            _salesOrderRepository = salesOrderRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _iyzicoAPIOptions = options.Value;
            _accountRepository = accountRepository;
            _logger = logger;
        }

        public async Task<PaymentDTO> Handle(CreatePayment request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository
                .GetAll()
                .Include(x => x.SalesOrderAddress)
                .Include(x => x.LineItems)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.AccountId == request.AccountId && x.Id == request.SalesOrderId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            if (salesOrder.State != Infrastructure.Shared.Enums.SalesOrderState.Delivered)
            {
                throw new InvalidPaymentOperationException(request.AccountId, request.SalesOrderId, "SalesOrder must be Delivered to complete payment.");
            }

            if (salesOrder.LineItems.Any(x => x.State == Infrastructure.Shared.Enums.SalesOrderLineItemState.None))
            {
                throw new InvalidPaymentOperationException(request.AccountId, request.SalesOrderId, "All SalesOrderLineItems must be Sold or Returned to complete payment.");
            }

            Domains.Models.PaymentDomain.Payment? payment = await _paymentRepository.GetBySalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (payment != null)
            {
                throw new PaymentAlreadyExistsException(request.AccountId, request.SalesOrderId);
            }

            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            PaymentMethod? paymentMethod = await _paymentMethodRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (paymentMethod == null)
            {
                throw new DefaultPaymentMethodNotFoundException(request.AccountId);
            }

            payment = new Domains.Models.PaymentDomain.Payment(request.AccountId, request.SalesOrderId);

            var soldLineItems = salesOrder.LineItems.Where(x => x.State == Infrastructure.Shared.Enums.SalesOrderLineItemState.Sold);

            var paymentRequest = GetPaymentRequest(account, paymentMethod, salesOrder, payment);

            IyzicoPayment iyzicoPayment = IyzicoPayment.Create(paymentRequest, new Iyzipay.Options
            {
                ApiKey = _iyzicoAPIOptions.APIKey,
                BaseUrl = _iyzicoAPIOptions.BaseUrl,
                SecretKey = _iyzicoAPIOptions.SecretKey
            });

            var iyzicoPaymentLog = JsonConvert.SerializeObject(iyzicoPayment, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                },
                Formatting = Formatting.Indented
            });

            _logger.LogInformation(iyzicoPaymentLog);

            if (iyzicoPayment.Status == "success")
            {
                if (iyzicoPayment.ConversationId != paymentRequest.ConversationId)
                {
                    // TODO: we might be hacked!!!
                    throw new InvalidOperationException("payment request failed");
                }

                foreach (var lineItem in soldLineItems)
                {
                    var paymentItemTransactionId = iyzicoPayment.PaymentItems.FirstOrDefault(x => x.ItemId == lineItem.ProductId.ToString())?.PaymentTransactionId;

                    if (string.IsNullOrEmpty(paymentItemTransactionId))
                    {
                        _logger.LogCritical("PaymentTransactionId is null for SalesOrder: {SalesOrderId}, Account: {AccountId}, Payment: {PaymentId}", salesOrder.Id, account.Id, iyzicoPayment.PaymentId);
                    }

                    payment.AddLineItem(lineItem.Product, paymentItemTransactionId ?? string.Empty);
                }

                await _paymentRepository.AddAsync(payment, cancellationToken);

                salesOrder.Completed();

                await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);
            }
            else
            {
                // TODO: check iyzicoPayment.errorCode and iyzicoPayment.errorMessage and throw proper exception with 

                throw new InvalidOperationException("payment request failed");
            }

            return payment.Adapt<PaymentDTO>();
        }

        private CreatePaymentRequest GetPaymentRequest(Account account, PaymentMethod paymentMethod, SalesOrder salesOrder, Domains.Models.PaymentDomain.Payment payment)
        {
            var soldLineItems = salesOrder.LineItems.Where(x => x.State == Infrastructure.Shared.Enums.SalesOrderLineItemState.Sold);

            PaymentCard paymentCard = new PaymentCard
            {
                CardToken = paymentMethod.CardToken,
                CardUserKey = paymentMethod.CardUserKey
            };

            Buyer buyer = new Buyer
            {
                Id = account.Id.ToString(),
                Name = account.FirstName,
                Surname = account.LastName,
                GsmNumber = account.Phone,
                Email = account.Email,
                IdentityNumber = "00000000000",
                RegistrationAddress = salesOrder.SalesOrderAddress.FullAddress,
                Ip = GetRemoteAddressIP(),
                City = salesOrder.SalesOrderAddress.City,
                Country = salesOrder.SalesOrderAddress.Country,
                ZipCode = salesOrder.SalesOrderAddress.ZipCode,
            };

            Address shippingAddress = new Address
            {
                ContactName = $"{salesOrder.SalesOrderAddress.FirstName} {salesOrder.SalesOrderAddress.LastName}",
                City = salesOrder.SalesOrderAddress.City,
                Country = salesOrder.SalesOrderAddress.Country,
                Description = salesOrder.SalesOrderAddress.FullAddress,
                ZipCode = salesOrder.SalesOrderAddress.ZipCode,
            };

            Address billingAddress = new Address
            {
                ContactName = $"{salesOrder.SalesOrderAddress.FirstName} {salesOrder.SalesOrderAddress.LastName}",
                City = salesOrder.SalesOrderAddress.City,
                Country = salesOrder.SalesOrderAddress.Country,
                Description = salesOrder.SalesOrderAddress.FullAddress,
                ZipCode = salesOrder.SalesOrderAddress.ZipCode,
            };

            List<BasketItem> basketItems = new List<BasketItem>();
            foreach (var lineItem in soldLineItems)
            {
                var basketItem = new BasketItem
                {
                    Id = lineItem.ProductId.ToString(),
                    Name = lineItem.Product.Name,
                    Category1 = lineItem.Product.Category,
                    Category2 = lineItem.Product.SubCategory,
                    ItemType = BasketItemType.PHYSICAL.ToString(),
                    Price = lineItem.Product.SalesPrice.ToString(new CultureInfo("en")),
                };

                basketItems.Add(basketItem);
            }

            CreatePaymentRequest paymetRequest = new CreatePaymentRequest
            {
                Locale = Locale.TR.ToString(),
                ConversationId = $"{account.Id}/{salesOrder.Id}",
                Price = soldLineItems.Sum(x => x.Product.SalesPrice).ToString(new CultureInfo("en")),
                PaidPrice = soldLineItems.Sum(x => x.Product.SalesPrice).ToString(new CultureInfo("en")),
                Currency = Currency.TRY.ToString(),
                Installment = 1,
                BasketId = salesOrder.Id.ToString(),
                PaymentChannel = PaymentChannel.WEB.ToString(),
                PaymentGroup = PaymentGroup.PRODUCT.ToString(),
                PaymentCard = paymentCard,
                Buyer = buyer,
                ShippingAddress = shippingAddress,
                BillingAddress = billingAddress,
                BasketItems = basketItems,
            };

            return paymetRequest;
        }

        private string GetRemoteAddressIP()
        {
            string remoteIPAddress = "00.00.00.000";

            try
            {
                var ip = _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString();

                if (string.IsNullOrEmpty(ip))
                {
                    return remoteIPAddress;
                }

                remoteIPAddress = ip;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch remote IP address.");
            }

            return remoteIPAddress;
        }
    }
}
