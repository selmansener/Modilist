
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ReturnAlreadyExistsException : Exception, IClientException
    {
        public ReturnAlreadyExistsException(Guid accountId, int salesOrderId)
            : base($"Return already exists with SalesOrderId: {salesOrderId}. AdditionalInfo: AccountId: {accountId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public int StatusCode => 409;
    }
}
