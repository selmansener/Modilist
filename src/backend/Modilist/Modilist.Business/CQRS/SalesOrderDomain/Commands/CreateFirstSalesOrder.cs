
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Models.SubscriptionDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreateFirstSalesOrder : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class CreateFirstSalesOrderValidator : AbstractValidator<CreateFirstSalesOrder>
    {
        public CreateFirstSalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateFirstSalesOrderHandler : IRequestHandler<CreateFirstSalesOrder>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public CreateFirstSalesOrderHandler(ISalesOrderRepository salesOrderRepository, IAddressRepository addressRepository, ISubscriptionRepository subscriptionRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _addressRepository = addressRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<Unit> Handle(CreateFirstSalesOrder request, CancellationToken cancellationToken)
        {
            var doesAccountHasAnyOrder = await _salesOrderRepository.DoesAccountHasAnyOrder(request.AccountId, cancellationToken);

            if (doesAccountHasAnyOrder)
            {
                return Unit.Value;
            }

            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            if (subscription.Plan == Infrastructure.Shared.Enums.SubscriptionPlan.OnDemand)
            {
                return Unit.Value;
            }

            Address? address = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new DefaultAddressNotFoundException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId, subscription.MaxPricingLimit);

            salesOrder.AssignAddress(address);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
