using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.DiscountsDomain;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.DiscountsDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.CQRS.DiscountsDomain.Commands
{
    public class GrantBodySizeDiscount : IRequest
    {
        public Guid AccountId { get; set; }
    }

    internal class GrantBodySizeDiscountValidator : AbstractValidator<GrantBodySizeDiscount>
    {
        public GrantBodySizeDiscountValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GrantBodySizeDiscountHandler : IRequestHandler<GrantBodySizeDiscount>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IDiscountsRepository _discountsRepository;
        private readonly ISizeInfoRepository _sizeInfoRepository;

        public GrantBodySizeDiscountHandler(IAccountRepository accountRepository, IDiscountsRepository discountsRepository, ISizeInfoRepository sizeInfoRepository)
        {
            _accountRepository = accountRepository;
            _discountsRepository = discountsRepository;
            _sizeInfoRepository = sizeInfoRepository;
        }

        public async Task<Unit> Handle(GrantBodySizeDiscount request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            var doesBodySizeDiscountExists = await _discountsRepository.DoesBodySizeDiscountExists(request.AccountId, cancellationToken);

            if (doesBodySizeDiscountExists)
            {
                // Just ignore this case
                return Unit.Value;
            }

            SizeInfo? sizeInfo = await _sizeInfoRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (sizeInfo == null)
            {
                throw new SizeInfoNotFoundException(request.AccountId);
            }

            if (!sizeInfo.DoesBodySizeProvided())
            {
                // No discount for this account.
                return Unit.Value;
            }

            var bodySizeDiscount = new ExclusiveDiscount(request.AccountId, Infrastructure.Shared.Enums.Currency.TRY, Infrastructure.Shared.Enums.DiscountType.BodySizeDiscount);

            bodySizeDiscount.Activate();

            await _discountsRepository.AddAsync(bodySizeDiscount, cancellationToken);

            return Unit.Value;
        }
    }
}
