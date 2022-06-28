
using Modilist.Domains.Base;
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

        public int ProductId { get; private set; }

        public Product Product { get; private set; }
    }
}
