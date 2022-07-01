
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class SalesOrderAlreadyDeliveredException : Exception, IClientException
    {
        public SalesOrderAlreadyDeliveredException(Guid accountId, int salesOrderId)
            : base($"SalesOrder already in delivered state. Additional Info: AccountId: {accountId}, SalesOrderId: {salesOrderId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public int StatusCode => 400;
    }
}
