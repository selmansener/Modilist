using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class DefaultAddressNotFoundException : Exception, IClientException
    {
        public DefaultAddressNotFoundException(Guid accountId)
            : base($"DefaultAddress not found for account with Id: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
