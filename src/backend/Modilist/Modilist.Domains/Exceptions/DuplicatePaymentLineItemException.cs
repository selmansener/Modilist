
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class DuplicatePaymentLineItemException : Exception, IClientException
    {
        public DuplicatePaymentLineItemException(Guid accountId, int paymentId, int productId)
            : base($"Payment already has a line item with same ProductId: {productId}. Additional info; AccountId: {accountId}, PaymentId: {paymentId}")
        {
            AccountId = accountId;
            PaymentId = paymentId;
            ProductId = productId;
        }

        public Guid AccountId { get; private set; }

        public int PaymentId { get; private set; }

        public int ProductId { get; private set; }

        public int StatusCode => 409;
    }
}
