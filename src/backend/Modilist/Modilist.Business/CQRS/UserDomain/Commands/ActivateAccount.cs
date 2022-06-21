
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.UserDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class ActivateAccount : IRequest<AccountDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class ActivateAccountValidator : AbstractValidator<ActivateAccount>
    {
        public ActivateAccountValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class ActivateAccountHandler : IRequestHandler<ActivateAccount, AccountDTO>
    {
        private readonly IAccountRepository _accountRepository;

        public ActivateAccountHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<AccountDTO> Handle(ActivateAccount request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            account.Activate();

            await _accountRepository.UpdateAsync(account, cancellationToken);

            return account.Adapt<AccountDTO>();
        }
    }
}
