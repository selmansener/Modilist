
using Modilist.Domains.Base;
using Modilist.Domains.Models.ProductDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.ReturnDomain
{
    public class ReturnLineItem : BaseEntity
    {
        public ReturnLineItem(int returnId, int productId)
        {
            ReturnId = returnId;
            ProductId = productId;
        }

        public int ReturnId { get; private set; }

        public Return Return { get; private set; }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        public ReturnLineItemState State { get; private set; }
    }
}
