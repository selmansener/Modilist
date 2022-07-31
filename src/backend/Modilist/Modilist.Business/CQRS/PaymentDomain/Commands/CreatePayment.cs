using System.Globalization;

using FluentValidation;

using Iyzipay.Model;
using Iyzipay.Request;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;
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
        private readonly IPaymentRepository _paymentRepository;
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;


        public CreatePaymentHandler(
            IPaymentRepository paymentRepository,
            ISalesOrderRepository salesOrderRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IAccountRepository accountRepository,
            IOptions<IyzicoAPIOptions> options)
        {
            _paymentRepository = paymentRepository;
            _salesOrderRepository = salesOrderRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _iyzicoAPIOptions = options.Value;
            _accountRepository = accountRepository;
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

            foreach (var lineItem in soldLineItems)
            {
                payment.AddLineItem(lineItem.Product);
            }

            var conversationId = Guid.NewGuid().ToString();

            var paymentRequest = GetPaymentRequest(account, paymentMethod, salesOrder, payment, conversationId);

            IyzicoPayment iyzicoPayment = IyzicoPayment.Create(paymentRequest, new Iyzipay.Options
            {
                ApiKey = _iyzicoAPIOptions.APIKey,
                BaseUrl = _iyzicoAPIOptions.BaseUrl,
                SecretKey = _iyzicoAPIOptions.SecretKey
            });

            if (iyzicoPayment.Status == "success")
            {
                if (iyzicoPayment.ConversationId != paymentRequest.ConversationId)
                {
                    // TODO: we might be hacked!!!
                    throw new InvalidOperationException("payment request failed");
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

        private CreatePaymentRequest GetPaymentRequest(Account account, PaymentMethod paymentMethod, SalesOrder salesOrder, Domains.Models.PaymentDomain.Payment payment, string conversationId)
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
                Ip = "00.00.00.000",
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
                    Id = lineItem.Id.ToString(),
                    Name = lineItem.Product.Name,
                    Category1 = lineItem.Product.Category,
                    ItemType = BasketItemType.PHYSICAL.ToString(),
                    Price = lineItem.Product.Price.ToString(new CultureInfo("en")),
                };

                basketItems.Add(basketItem);
            }

            CreatePaymentRequest paymetRequest = new CreatePaymentRequest
            {
                Locale = Locale.TR.ToString(),
                ConversationId = conversationId,
                Price = payment.TotalPrice.ToString(new CultureInfo("en")),
                PaidPrice = payment.TotalPrice.ToString(new CultureInfo("en")),
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
    }
}
