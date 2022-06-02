
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class SizeInfoNotFoundException : Exception, IClientException
    {
        public SizeInfoNotFoundException(Guid accountId)
            : base($"SizeInfo not found for account with Id: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
