
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class UpdateAdditionalRequests : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int SalesOrderId { get; set; }

        public string? AdditionalRequests { get; set; }
    }

    internal class UpdateAdditionalRequestsValidator : AbstractValidator<UpdateAdditionalRequests>
    {
        public UpdateAdditionalRequestsValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.AdditionalRequests).MaximumLength(4000);
        }
    }

    internal class UpdateAdditionalRequestsHandler : IRequestHandler<UpdateAdditionalRequests>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public UpdateAdditionalRequestsHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<Unit> Handle(UpdateAdditionalRequests request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.UpdateAdditionalRequests(request.AdditionalRequests);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
