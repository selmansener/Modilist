
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class SalesOrderLineItemNotFoundException : Exception, IClientException
    {
        public SalesOrderLineItemNotFoundException(Guid accountId, int salesOrderId, int salesOrderLineItemId)
            : base($"SalesOrderLineItem not found with Id: {salesOrderLineItemId}. Additional Info: AccountId: {accountId}, SalesOrderId: {salesOrderId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            SalesOrderLineItemId = salesOrderLineItemId;
        }

        public int SalesOrderLineItemId { get; private set; }

        public int SalesOrderId { get; private set; }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
