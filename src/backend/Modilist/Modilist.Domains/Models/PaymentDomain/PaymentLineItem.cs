
using Modilist.Domains.Base;
using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Domains.Models.PaymentDomain
{
    public class PaymentLineItem : BaseEntity
    {
        public PaymentLineItem(int paymentId, int productId, decimal price, decimal salesPrice, string paymentTransactionId)
        {
            PaymentId = paymentId;
            ProductId = productId;
            Price = price;
            SalesPrice = salesPrice;
            PaymentTransactionId = paymentTransactionId;
        }

        public int PaymentId { get; private set; }

        public Payment Payment { get; private set; }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        public decimal Price { get; private set; }

        public decimal SalesPrice { get; private set; }

        public string PaymentTransactionId { get; private set; }
    }
}
