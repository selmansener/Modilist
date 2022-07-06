
using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;

namespace Modilist.Business.CQRS.SalesOrderDomain.Queries
{
    public class GetSalesOrderDetails : IRequest<SalesOrderDetailsDTO>
    {
        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }
    }

    internal class GetSalesOrderDetailsValidator : AbstractValidator<GetSalesOrderDetails>
    {
        public GetSalesOrderDetailsValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
        }
    }

    internal class GetSalesOrderDetailsHandler : IRequestHandler<GetSalesOrderDetails, SalesOrderDetailsDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public GetSalesOrderDetailsHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<SalesOrderDetailsDTO> Handle(GetSalesOrderDetails request, CancellationToken cancellationToken)
        {
            SalesOrderDetailsDTO? salesOrderDetails = await _salesOrderRepository.GetAllAsNoTracking()
                .ProjectToType<SalesOrderDetailsDTO>()
                .FirstOrDefaultAsync(x => x.Id == request.SalesOrderId && x.AccountId == request.AccountId, cancellationToken);

            if (salesOrderDetails == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            return salesOrderDetails;
        }
    }
}
