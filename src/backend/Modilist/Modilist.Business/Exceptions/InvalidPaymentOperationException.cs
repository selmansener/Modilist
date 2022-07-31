
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class InvalidPaymentOperationException : Exception, IClientException
    {
        public InvalidPaymentOperationException(Guid accountId, int salesOrderId, string reason)
            : base($"Payment operation is invalid for salesOrderId: {salesOrderId}. Reason: {reason}, AdditionalInfo: AccountId: {accountId}")
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
