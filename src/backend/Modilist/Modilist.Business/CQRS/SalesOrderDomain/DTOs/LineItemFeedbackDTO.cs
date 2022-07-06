
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class LineItemFeedbackDTO
    {
        public int Id { get; set; }

        public float Price { get; set; }

        public LineItemSizeFeedback Size { get; set; }

        public float Style { get; set; }

        public float Fit { get; set; }

        public float Color { get; set; }

        public float Quality { get; set; }

        public float Fabric { get; set; }

        public float Pattern { get; set; }

        public float PerfectMatch { get; set; }

        public float Brand { get; set; }

        public bool SendSimilarProducts { get; set; }

        public string? AdditionalNotes { get; set; }
    }
}
