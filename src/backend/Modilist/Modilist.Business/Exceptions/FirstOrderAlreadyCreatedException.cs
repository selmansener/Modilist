
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class FirstOrderAlreadyCreatedException : Exception, IClientException
    {
        public FirstOrderAlreadyCreatedException(Guid accountId)
            : base($"Account with Id: {accountId} has already created first order.")
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public int StatusCode => 400;
    }
}
