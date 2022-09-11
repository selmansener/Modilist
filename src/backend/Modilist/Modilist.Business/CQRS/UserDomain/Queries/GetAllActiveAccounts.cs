using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MediatR;

using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Business.CQRS.UserDomain.Queries
{
    public class GetAllActiveAccounts : IRequest<IEnumerable<Account>>
    {
    }

    internal class GetAllActiveAccountsHandler : IRequestHandler<GetAllActiveAccounts, IEnumerable<Account>>
    {
        private readonly IAccountRepository _accountRepository;

        public GetAllActiveAccountsHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<IEnumerable<Account>> Handle(GetAllActiveAccounts request, CancellationToken cancellationToken)
        {
            return await _accountRepository.GetAllActiveAsync(cancellationToken);
        }
    }
}
