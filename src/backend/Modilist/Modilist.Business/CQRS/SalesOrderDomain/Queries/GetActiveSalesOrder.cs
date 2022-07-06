
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Business.CQRS.SalesOrderDomain.Queries
{
    public class GetActiveSalesOrder : IRequest<ActiveSalesOrderDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetActiveSalesOrderValidator : AbstractValidator<GetActiveSalesOrder>
    {
        public GetActiveSalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetActiveSalesOrderHandler : IRequestHandler<GetActiveSalesOrder, ActiveSalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public GetActiveSalesOrderHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<ActiveSalesOrderDTO> Handle(GetActiveSalesOrder request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetLatestActiveOrderAsync(request.AccountId, cancellationToken);

            if (salesOrder == null)
            {
                throw new ActiveSalesOrderNotFoundException(request.AccountId);
            }

            return salesOrder.Adapt<ActiveSalesOrderDTO>();
        }
    }
}
