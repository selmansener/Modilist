
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class SubscriptionNotFoundException : Exception, IClientException
    {
        public SubscriptionNotFoundException(Guid accountId)
            : base($"Subscription not found for account with Id: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
