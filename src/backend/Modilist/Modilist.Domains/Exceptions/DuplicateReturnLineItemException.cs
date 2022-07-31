
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class DuplicateReturnLineItemException : Exception, IClientException
    {
        public DuplicateReturnLineItemException(Guid accountId, int returnId, int productId)
            : base($"Return already has a line item with same ProductId: {productId}. Additional info; AccountId: {accountId}, SalesOrderId: {returnId}")
        {
            AccountId = accountId;
            ReturnId = returnId;
            ProductId = productId;
        }

        public Guid AccountId { get; private set; }

        public int ReturnId { get; private set; }

        public int ProductId { get; private set; }

        public int StatusCode => 409;
    }
}
