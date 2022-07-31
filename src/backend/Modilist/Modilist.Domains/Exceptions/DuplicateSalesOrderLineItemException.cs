
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    public class DuplicateSalesOrderLineItemException : Exception, IClientException
    {
        public DuplicateSalesOrderLineItemException(Guid accountId, int salesOrderId, int productId)
            : base($"SalesOrder already has a line item with same ProductId: {productId}. Additional info; AccountId: {accountId}, SalesOrderId: {salesOrderId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            ProductId = productId;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public int ProductId { get; private set; }

        public int StatusCode => 409;
    }
}
