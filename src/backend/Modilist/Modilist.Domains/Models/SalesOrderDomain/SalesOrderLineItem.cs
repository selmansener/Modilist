
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

        public LineItemFeedback? LineItemFeedback { get; private set; }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        public void AddFeedback(
            float price,
            LineItemSizeFeedback size,
            float style,
            float fit,
            float color,
            float quality,
            float fabric,
            float pattern,
            float perfectMatch,
            bool sendSimilarProducts = false,
            bool blockBrand = false,
            string? additionalNotes = null)
        {
            if (LineItemFeedbackId.HasValue)
            {
                throw new LineItemAlreadyHasFeedbackException(LineItemFeedbackId.Value);
            }

            LineItemFeedback = new LineItemFeedback(Id, price, size, style, fit, color, quality, fabric, pattern, perfectMatch, sendSimilarProducts, blockBrand, additionalNotes);
        }
    }
}
