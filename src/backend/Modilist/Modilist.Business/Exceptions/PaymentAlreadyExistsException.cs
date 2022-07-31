
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class PaymentAlreadyExistsException : Exception, IClientException
    {
        public PaymentAlreadyExistsException(Guid accountId, int salesOrderId)
            : base($"Payment already exists for SalesOrderId: {salesOrderId}. AdditionalInfo: {accountId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public int StatusCode => 409;
    }
}
