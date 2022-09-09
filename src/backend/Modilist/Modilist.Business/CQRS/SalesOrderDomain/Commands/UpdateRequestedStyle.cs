
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class UpdateRequestedStyle : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int SalesOrderId { get; set; }

        public string? RequestedStyle { get; set; }
    }

    internal class UpdateRequestedStyleValidator : AbstractValidator<UpdateRequestedStyle>
    {
        public UpdateRequestedStyleValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.RequestedStyle).NotEmpty();
        }
    }

    internal class UpdateRequestedStyleHandler : IRequestHandler<UpdateRequestedStyle>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public UpdateRequestedStyleHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<Unit> Handle(UpdateRequestedStyle request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetLatestActiveOrderAsync(request.AccountId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.UpdateRequestedStyle(request.RequestedStyle);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
