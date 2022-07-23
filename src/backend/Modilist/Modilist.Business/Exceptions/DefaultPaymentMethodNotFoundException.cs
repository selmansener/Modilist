
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class DefaultPaymentMethodNotFoundException : Exception, IClientException
    {
        public DefaultPaymentMethodNotFoundException(Guid accountId)
            : base($"DefaultPaymentMethod not found with following AccountId: {accountId}")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 404;
    }
}
