
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class SubscriptionAlreadyExistsException : Exception, IClientException
    {
        public SubscriptionAlreadyExistsException(Guid accountId)
            : base($"Subscription already exists for account with Id: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 409;
    }
}
