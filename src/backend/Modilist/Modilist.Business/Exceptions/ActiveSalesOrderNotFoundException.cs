
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ActiveSalesOrderNotFoundException : Exception, IClientException
    {
        public ActiveSalesOrderNotFoundException(Guid accountId)
            : base($"Active SalesOrder not found with AccountId: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
