
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class SalesOrderNotFoundException : Exception, IClientException
    {
        public SalesOrderNotFoundException(Guid accountId, int salesOrderId)
            : base($"SalesOrder not found with Id: {salesOrderId} for account: {accountId}")
        {
            SalesOrderId = salesOrderId;
            AccountId = accountId;
        }

        public int SalesOrderId { get; set; }

        public Guid AccountId { get; set; }

        public int StatusCode => 404;
    }
}
