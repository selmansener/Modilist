
using Mapster;

using MediatR;

using Modilist.Business.CQRS.UserDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Business.CQRS.UserDomain.Queries
{
    public class GetAccount : IRequest<AccountDTO>
    {
        public Guid Id { get; set; }
    }

    internal class GetAccountHandler : IRequestHandler<GetAccount, AccountDTO>
    {
        private readonly IAccountReadRepository _accountReadRepository;

        public GetAccountHandler(IAccountReadRepository accountReadRepository)
        {
            _accountReadRepository = accountReadRepository;
        }

        public async Task<AccountDTO> Handle(GetAccount request, CancellationToken cancellationToken)
        {
            Account account = await _accountReadRepository.GetByIdAsync(request.Id, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.Id);
            }

            return account.Adapt<AccountDTO>();
        }
    }
}
