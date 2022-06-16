
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class PreferedFabricPropertiesNotFoundException : Exception, IClientException
    {
        public PreferedFabricPropertiesNotFoundException(Guid accountId)
            : base($"PreferedFabricProperties not found with AccountId: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int Code => 404;

        public int StatusCode => 404;
    }
}
