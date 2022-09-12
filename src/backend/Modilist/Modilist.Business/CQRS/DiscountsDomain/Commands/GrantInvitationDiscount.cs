using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.DiscountsDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.DiscountsDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.DiscountsDomain.Commands
{
    public class GrantInvitationDiscount : IRequest
    {
        public Guid AccountId { get; set; }
    }

    internal class GrantInvitationDiscountValidator : AbstractValidator<GrantInvitationDiscount>
    {
        public GrantInvitationDiscountValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GrantInvitationDiscountHandler : IRequestHandler<GrantInvitationDiscount>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IDiscountsRepository _discountRepository;

        public GrantInvitationDiscountHandler(IAccountRepository accountRepository, IDiscountsRepository discountRepository)
        {
            _accountRepository = accountRepository;
            _discountRepository = discountRepository;
        }

        public async Task<Unit> Handle(GrantInvitationDiscount request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            if (account.State != AccountState.Active)
            {
                throw new GrantInvitationFailureException(request.AccountId, account.State);
            }

            Discount? discount = await _discountRepository.GetByInvitationEmail(account.Email, cancellationToken);

            if (discount == null)
            {
                throw new DiscountNotFoundException(account.Email);
            }

            discount.Activate();

            await _discountRepository.UpdateAsync(discount, cancellationToken);

            return Unit.Value;
        }
    }
}
