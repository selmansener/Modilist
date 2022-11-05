
using FluentValidation;

using MediatR;

using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.Extensions.Logging;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreatePeriodicSalesOrders : IRequest
    {
        public CreatePeriodicSalesOrders(Guid accountId)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }
    }

    internal class CreatePeriodicSalesOrdersValidator : AbstractValidator<CreatePeriodicSalesOrders>
    {
        public CreatePeriodicSalesOrdersValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreatePeriodicSalesOrdersHandler : IRequestHandler<CreatePeriodicSalesOrders>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ILogger<CreatePeriodicSalesOrdersHandler> _logger;

        public CreatePeriodicSalesOrdersHandler(ISalesOrderRepository salesOrderRepository, ILogger<CreatePeriodicSalesOrdersHandler> logger, IAddressRepository addressRepository, ISubscriptionRepository subscriptionRepository, IAccountRepository accountRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _logger = logger;
            _addressRepository = addressRepository;
            _subscriptionRepository = subscriptionRepository;
            _accountRepository = accountRepository;
        }

        public async Task<Unit> Handle(CreatePeriodicSalesOrders request, CancellationToken cancellationToken)
        {
            var latestActiveOrder = await _salesOrderRepository.GetLatestActiveOrderAsync(request.AccountId, cancellationToken);

            if (latestActiveOrder != null)
            {
                using (_logger.BeginScope("Missing Order for Account: {AccountId}", request.AccountId))
                {
                    if (DateTime.UtcNow.AddDays(-7) >= latestActiveOrder.CreatedAt)
                    {
                        _logger.LogCritical("Potential latency for SalesOrder: {SalesOrderId}", latestActiveOrder.Id);
                    }
                    else
                    {
                        _logger.LogWarning("Account already has an active SalesOrder: {SalesOrderId}", latestActiveOrder.Id);
                    }
                }

                return Unit.Value;
            }

            var subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if(subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            var subscriptionPlan = subscription.Plan;

            if (subscriptionPlan == SubscriptionPlan.None)
            {
                throw new InvalidSubscriptionPlanException(request.AccountId, subscriptionPlan);
            }
            else if(subscriptionPlan == SubscriptionPlan.OnDemand)
            {
                return Unit.Value;
            }

            var latestCompletedOrder = await _salesOrderRepository.GetLatestCompletedOrderAsync(request.AccountId, cancellationToken);

            if( latestCompletedOrder == null)
            {
                return Unit.Value;
            }

            Dictionary<SubscriptionPlan, int> planTimePeriodsDic = new Dictionary<SubscriptionPlan, int>
            {
                { SubscriptionPlan.InEveryTwoWeeks, 14 },
                { SubscriptionPlan.InEveryMonth, 30 },
                { SubscriptionPlan.InEveryTwoMonths, 60 },
                { SubscriptionPlan.InEveryThreeMonth, 90 }
            };

            var latestOrderDate = latestCompletedOrder.CreatedAt;

            var today = DateTime.UtcNow;

            if (today.AddDays(-planTimePeriodsDic[subscriptionPlan]) <= latestOrderDate)
            {
                return Unit.Value;
            }

            var defaultAddress = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (defaultAddress == null)
            {
                throw new DefaultAddressNotFoundException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId);

            salesOrder.AssignAddress(defaultAddress);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
