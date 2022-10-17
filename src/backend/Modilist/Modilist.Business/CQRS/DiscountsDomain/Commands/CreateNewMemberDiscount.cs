
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.DiscountsDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.DiscountsDomain;

namespace Modilist.Business.CQRS.DiscountsDomain.Commands
{
    public class CreateNewMemberDiscount : IRequest
    {
        public Guid AccountId { get; set; }
    }

    internal class CreateNewMemberDiscountValidator : AbstractValidator<CreateNewMemberDiscount>
    {
        public CreateNewMemberDiscountValidator()
        {
            RuleFor(c => c.AccountId).NotEmpty();
        }
    }

    internal class CreateNewMemberDiscountHandler : IRequestHandler<CreateNewMemberDiscount>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IDiscountsRepository _discountRepository;

        public CreateNewMemberDiscountHandler(IAccountRepository accountRepository, IDiscountsRepository discountRepository)
        {
            _accountRepository = accountRepository;
            _discountRepository = discountRepository;
        }

        public async Task<Unit> Handle(CreateNewMemberDiscount request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            var doesNewMemberDiscountExists = await _discountRepository.DoesNewMemberDiscountExists(request.AccountId, cancellationToken);

            if (doesNewMemberDiscountExists)
            {
                // Just ignore this case
                return Unit.Value;
            }


            var newMemberDiscount = new ExclusiveDiscount(request.AccountId, Infrastructure.Shared.Enums.Currency.TRY, Infrastructure.Shared.Enums.DiscountType.NewMemberDiscount);

            newMemberDiscount.Activate();

            await _discountRepository.AddAsync(newMemberDiscount, cancellationToken);

            return Unit.Value;
        }
    }
}
