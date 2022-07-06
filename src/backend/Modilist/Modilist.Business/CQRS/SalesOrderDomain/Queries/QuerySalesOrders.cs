
using DynamicQueryBuilder;
using DynamicQueryBuilder.Models;

using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.DTOs;
using Modilist.Data.Repositories.SalesOrderDomain;

namespace Modilist.Business.CQRS.SalesOrderDomain.Queries
{
    public class QuerySalesOrders : IRequest<DQBResultDTO<SalesOrderDetailsDTO>>
    {
        public Guid AccountId { get; set; }

        public DynamicQueryOptions Dqb { get; set; }
    }

    internal class QuerySalesOrdersValidator : AbstractValidator<QuerySalesOrders>
    {
        public QuerySalesOrdersValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class QuerySalesOrdersHandler : IRequestHandler<QuerySalesOrders, DQBResultDTO<SalesOrderDetailsDTO>>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public QuerySalesOrdersHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<DQBResultDTO<SalesOrderDetailsDTO>> Handle(QuerySalesOrders request, CancellationToken cancellationToken)
        {
            var data = await _salesOrderRepository
                .QueryAllByAccountId(request.AccountId)
                .ProjectToType<SalesOrderDetailsDTO>()
                .ApplyFilters(request.Dqb)
                .ToListAsync(cancellationToken);

            return new DQBResultDTO<SalesOrderDetailsDTO>
            {
                Data = data,
                Count = request.Dqb.PaginationOption.DataSetCount
            };
        }
    }
}
