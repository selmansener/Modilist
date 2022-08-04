
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class UpdateSalesOrderFailureException : Exception, IClientException
    {
        public UpdateSalesOrderFailureException(Guid accountId, int salesOrderId, string reason)
            : base($"Invalid update sales order operation for SalesOrderId: {salesOrderId}. Reason: {reason}. AdditionalInfo: AccountId: {accountId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            Reason = reason;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public string Reason { get; private set; }

        public int StatusCode => 400;
    }
}
