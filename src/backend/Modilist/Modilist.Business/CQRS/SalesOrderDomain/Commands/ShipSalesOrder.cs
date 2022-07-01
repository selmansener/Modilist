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

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class ShipSalesOrder : IRequest<ShipSalesOrderDTO>
    {
        public int SalesOrderId { get; set; }

        public Guid AccountId { get; set; }

        public string? CargoState { get; set; }

        public string? CargoTrackingCode { get; set; }
    }

    internal class ShipSalesOrderValidator : AbstractValidator<ShipSalesOrder>
    {
        public ShipSalesOrderValidator()
        {
            RuleFor(c => c.SalesOrderId).NotEmpty();
            RuleFor(c => c.AccountId).NotEmpty();
            RuleFor(c => c.CargoTrackingCode).NotEmpty();
        }
    }

    internal class ShipSalesOrderHandler : IRequestHandler<ShipSalesOrder, ShipSalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public ShipSalesOrderHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<ShipSalesOrderDTO> Handle(ShipSalesOrder request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.Shipped(request.CargoState, request.CargoTrackingCode);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return salesOrder.Adapt<ShipSalesOrderDTO>();
        }
    }
}
