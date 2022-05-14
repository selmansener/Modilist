
using Mapster;

using MediatR;

using Modilist.Business.CQRS.UserDomain.DTOs;
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
            // Check id with user claims

            Account account = await _accountReadRepository.GetByIdAsync(request.Id, cancellationToken);

            // TODO: change response type
            if (account == null)
            {
                throw new Exception("account not found");
            }

            return account.Adapt<AccountDTO>();
        }
    }
}
