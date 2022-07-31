
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreateFirstSalesOrder : IRequest<SalesOrderDTO>
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

    internal class CreateFirstSalesOrderHandler : IRequestHandler<CreateFirstSalesOrder, SalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public CreateFirstSalesOrderHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<SalesOrderDTO> Handle(CreateFirstSalesOrder request, CancellationToken cancellationToken)
        {
            var doesAccountHasAnyOrder = await _salesOrderRepository.DoesAccountHasAnyOrder(request.AccountId, cancellationToken);

            if (doesAccountHasAnyOrder)
            {
                throw new FirstOrderAlreadyCreatedException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return salesOrder.Adapt<SalesOrderDTO>();
        }
    }
}
