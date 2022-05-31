
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class StylePreferencesNotFoundException : Exception, IClientException
    {
        public StylePreferencesNotFoundException(Guid accountId)
            : base($"StylePreferences not found for account with Id: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
