
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class BuyAllLineItems : IRequest
    {
        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }
    }

    internal class BuyAllLineItemsValidator : AbstractValidator<BuyAllLineItems>
    {
        public BuyAllLineItemsValidator()
        {
            RuleFor(c => c.AccountId).NotEmpty();
            RuleFor(c => c.SalesOrderId).NotEmpty();
        }
    }

    internal class BuyAllLineItemsHandler : IRequestHandler<BuyAllLineItems>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public BuyAllLineItemsHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<Unit> Handle(BuyAllLineItems request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken, includeLineItems: true);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.BuyAllLineItems();

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
