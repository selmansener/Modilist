
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class UpdateEstimatedDeliveryDate : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int SalesOrderId { get; set; }

        public DateTime EstimatedDeliveryDate { get; set; }
    }

    internal class UpdateEstimatedDeliveryDateValidator : AbstractValidator<UpdateEstimatedDeliveryDate>
    {
        public UpdateEstimatedDeliveryDateValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.EstimatedDeliveryDate).NotEmpty();
        }
    }

    internal class UpdateEstimatedDeliveryDateHandler : IRequestHandler<UpdateEstimatedDeliveryDate>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public UpdateEstimatedDeliveryDateHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<Unit> Handle(UpdateEstimatedDeliveryDate request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.UpdateEstimatedDeliveryDate(request.EstimatedDeliveryDate);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
