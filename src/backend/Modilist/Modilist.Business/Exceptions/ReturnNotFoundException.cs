
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ReturnNotFoundException : Exception, IClientException
    {
        public ReturnNotFoundException(Guid accountId, int salesOrderId)
            : base($"Return not found with SalesOrderId: {salesOrderId}. AdditionalInfo: AccountId: {accountId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public int StatusCode => 404;
    }
}
