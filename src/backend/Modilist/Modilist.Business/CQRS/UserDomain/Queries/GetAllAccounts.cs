
using MediatR;

using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Business.CQRS.UserDomain.Queries
{
    public class GetAllAccounts : IRequest<IEnumerable<Account>>
    {
    }

    internal class GetAllAccountsHandler : IRequestHandler<GetAllAccounts, IEnumerable<Account>>
    {
        private readonly IAccountRepository _accountRepository;

        public GetAllAccountsHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<IEnumerable<Account>> Handle(GetAllAccounts request, CancellationToken cancellationToken)
        {
            return await _accountRepository.GetAllAsync(cancellationToken);
        }
    }
}
