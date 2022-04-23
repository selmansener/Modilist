
using MediatR;

using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class CreateAccount : IRequest
    {
        public Guid Id { get; set; }
    }

    internal class CreateAccountHandler : IRequestHandler<CreateAccount>
    {
        private readonly IAccountWriteRepository _accountWriteRepository;

        public CreateAccountHandler(IAccountWriteRepository accountWriteRepository)
        {
            _accountWriteRepository = accountWriteRepository;
        }

        public async Task<Unit> Handle(CreateAccount request, CancellationToken cancellationToken)
        {
            Account account = await _accountWriteRepository.GetByIdAsync(request.Id, cancellationToken);

            if (account != null)
            {
                // TODO: change to client exception
                throw new Exception("account already exists");
            }

            account = new Account(request.Id);

            await _accountWriteRepository.AddAsync(account, cancellationToken, true);

            return Unit.Value;
        }
    }
}
