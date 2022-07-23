
using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.SalesOrderDomain
{
    public class LineItemFeedback : BaseEntity
    {
        public LineItemFeedback(
            int salesOrderLineItemId,
            float price,
            LineItemSizeFeedback size,
            float style,
            float fit,
            float color,
            float quality,
            float fabric,
            float pattern,
            float perfectMatch,
            float brand,
            bool sendSimilarProducts = false,
            string? additionalNotes = null)
        {
            SalesOrderLineItemId = salesOrderLineItemId;
            Price = price;
            Size = size;
            Style = style;
            Fit = fit;
            Color = color;
            Quality = quality;
            Fabric = fabric;
            Pattern = pattern;
            PerfectMatch = perfectMatch;
            SendSimilarProducts = sendSimilarProducts;
            Brand = brand;
            AdditionalNotes = additionalNotes;
        }

        public int SalesOrderLineItemId { get; private set; }

        public SalesOrderLineItem SalesOrderLineItem { get; set; }

        public float Price { get; private set; }

        public LineItemSizeFeedback Size { get; private set; }

        public float Style { get; private set; }

        public float Fit { get; private set; }

        public float Color { get; private set; }

        public float Quality { get; private set; }

        public float Fabric { get; private set; }

        public float Pattern { get; private set; }

        public float PerfectMatch { get; private set; }

        public bool SendSimilarProducts { get; private set; }

        public float Brand { get; private set; }

        public string? AdditionalNotes { get; private set; }

        internal void UpdateFeedback(
            float price,
            LineItemSizeFeedback size,
            float style,
            float fit,
            float color,
            float quality,
            float fabric,
            float pattern,
            float perfectMatch,
            float brand,
            bool sendSimilarProducts = false,
            string? additionalNotes = null)
        {
            Price = price;
            Size = size;
            Style = style;
            Fit = fit;
            Color = color;
            Quality = quality;
            Fabric = fabric;
            Pattern = pattern;
            PerfectMatch = perfectMatch;
            SendSimilarProducts = sendSimilarProducts;
            Brand = brand;
            AdditionalNotes = additionalNotes;
        }
    }
}
