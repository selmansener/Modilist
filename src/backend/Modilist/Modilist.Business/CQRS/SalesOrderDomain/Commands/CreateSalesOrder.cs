
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Models.SubscriptionDomain;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreateSalesOrder : IRequest<SalesOrderDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class CreateSalesOrderValidator : AbstractValidator<CreateSalesOrder>
    {
        public CreateSalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateSalesOrderHandler : IRequestHandler<CreateSalesOrder, SalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public CreateSalesOrderHandler(ISalesOrderRepository salesOrderRepository, IAddressRepository addressRespository, ISubscriptionRepository subscriptionRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _addressRepository = addressRespository;
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<SalesOrderDTO> Handle(CreateSalesOrder request, CancellationToken cancellationToken)
        {
            var endDate = DateTime.UtcNow;
            // TODO: Get date amount from config.
            var startDate = endDate.AddDays(-7);

            var doesOrderExists = await _salesOrderRepository.DoesSalesOrderInDateTimeRangeAsync(request.AccountId, startDate, endDate, cancellationToken);

            if (doesOrderExists)
            {
                throw new AccountHasActiveSalesOrderException(request.AccountId, startDate, endDate);
            }

            Address? address = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new DefaultAddressNotFoundException(request.AccountId);
            }

            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId, subscription.MaxPricingLimit);

            salesOrder.AssignAddress(address);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return salesOrder.Adapt<SalesOrderDTO>();
        }
    }
}
