
using FluentValidation;

using MediatR;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class AddOrUpdateFeedback : IRequest<AddOrUpdateFeedbackDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int SalesOrderId { get; set; }

        [JsonIgnore]
        public int SalesOrderLineItemId { get; set; }

        public SalesOrderLineItemState LineItemState { get; set; }

        public float Price { get; set; }

        public LineItemSizeFeedback Size { get; set; }

        public float Style { get; set; }

        public float Fit { get; set; }

        public float Color { get; set; }

        public float Quality { get; set; }

        public float Fabric { get; set; }

        public float Pattern { get; set; }

        public float PerfectMatch { get; set; }

        public bool SendSimilarProducts { get; set; }

        public float Brand { get; set; }

        public string? AdditionalNotes { get; set; }
    }

    internal class AddOrUpdateFeedbackValidator : AbstractValidator<AddOrUpdateFeedback>
    {
        public AddOrUpdateFeedbackValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.SalesOrderLineItemId).NotEmpty();
        }
    }

    internal class AddOrUpdateFeedbackHandler : IRequestHandler<AddOrUpdateFeedback, AddOrUpdateFeedbackDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public AddOrUpdateFeedbackHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<AddOrUpdateFeedbackDTO> Handle(AddOrUpdateFeedback request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository
                .GetAll()
                .Include(x => x.LineItems)
                    .ThenInclude(x => x.Feedback)
                .FirstOrDefaultAsync(x => x.AccountId == request.AccountId && x.Id == request.SalesOrderId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.AddOrUpdateFeedback(
                request.SalesOrderLineItemId,
                request.LineItemState,
                request.Price,
                request.Size,
                request.Style,
                request.Fit,
                request.Color,
                request.Quality,
                request.Fabric,
                request.Pattern,
                request.PerfectMatch,
                request.Brand,
                request.SendSimilarProducts,
                request.AdditionalNotes);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return new AddOrUpdateFeedbackDTO
            {
                SalesOrderId = request.SalesOrderId,
                SalesOrderLineItemId = request.SalesOrderLineItemId,
                SalesOrderLineItemState = request.LineItemState
            };
        }
    }
}
