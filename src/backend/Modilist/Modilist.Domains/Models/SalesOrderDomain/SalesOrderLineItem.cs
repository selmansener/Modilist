
using Modilist.Domains.Base;
using Modilist.Domains.Exceptions;
using Modilist.Domains.Models.ProductDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.SalesOrderDomain
{
    public class SalesOrderLineItem : BaseEntity
    {
        public SalesOrderLineItem(int salesOrderId, int productId)
        {
            SalesOrderId = salesOrderId;
            ProductId = productId;
            State = SalesOrderLineItemState.None;
        }

        public int SalesOrderId { get; private set; }

        public SalesOrder SalesOrder { get; private set; }

        public SalesOrderLineItemState State { get; private set; }

        public int? LineItemFeedbackId { get; private set; }

        public LineItemFeedback? Feedback { get; private set; }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        internal void AddOrUpdateFeedback(
            SalesOrderLineItemState state,
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

            if (state == SalesOrderLineItemState.None)
            {
                throw new InvalidOperationException("Invalid SalesOrderLineItemState: None");
            }

            State = state;

            if (LineItemFeedbackId.HasValue)
            {
                Feedback.UpdateFeedback(price, size, style, fit, color, quality, fabric, pattern, perfectMatch, brand, sendSimilarProducts,  additionalNotes);
            }
            else
            {
                Feedback = new LineItemFeedback(Id, price, size, style, fit, color, quality, fabric, pattern, perfectMatch, brand, sendSimilarProducts, additionalNotes);
            }
        }

        internal void Sold()
        {
            State = SalesOrderLineItemState.Sold;
        }
    }
}
