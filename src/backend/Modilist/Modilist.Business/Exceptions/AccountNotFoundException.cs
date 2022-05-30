
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    public class AccountNotFoundException : Exception, IClientException
    {
        public AccountNotFoundException(Guid id)
            : base($"Account not found with Id: {id}")
        {
            Id = id;
        }

        public Guid Id { get; private set; }

        public int Code => 404;

        public int StatusCode => 404;
    }
}
