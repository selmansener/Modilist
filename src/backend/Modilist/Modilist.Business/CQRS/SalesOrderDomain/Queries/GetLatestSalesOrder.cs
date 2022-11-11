using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Queries
{
    public class GetLatestSalesOrder : IRequest<LatestSalesOrderDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class GetLatestSalesOrderValidator : AbstractValidator<LatestSalesOrderDTO>
    {
        public GetLatestSalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetLatestSalesOrderHandler : IRequestHandler<GetLatestSalesOrder, LatestSalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public GetLatestSalesOrderHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<LatestSalesOrderDTO> Handle(GetLatestSalesOrder request, CancellationToken cancellationToken)
        {
            SalesOrder? latestSalesOrder = await _salesOrderRepository.GetLatestOrderAsync(request.AccountId, cancellationToken);

            if (latestSalesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId);
            }

            return latestSalesOrder.Adapt<LatestSalesOrderDTO>();
        }
    }

}
