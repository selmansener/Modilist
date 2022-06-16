
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class FitPreferencesNotFoundException : Exception, IClientException
    {
        public FitPreferencesNotFoundException(Guid accountId)
            : base($"FitPreferences not found for account with Id: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
