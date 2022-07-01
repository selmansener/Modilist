
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class InvalidOrderStateFeedbackException : Exception, IClientException
    {
        public InvalidOrderStateFeedbackException(int salesOrderId, int salesOrderLineItemId, SalesOrderState salesOrderState)
            : base($"Adding feedback probhited for non-delivered orders. Additional Info: SalesOrderId: {salesOrderState}")
        {
            SalesOrderId = salesOrderId;
            SalesOrderLineItemId = salesOrderLineItemId;
            SalesOrderState = salesOrderState;
        }

        public int SalesOrderId { get; private set; }

        public int SalesOrderLineItemId { get; private set; }

        public SalesOrderState SalesOrderState { get; private set; }

        public int StatusCode => 400;
    }
}
