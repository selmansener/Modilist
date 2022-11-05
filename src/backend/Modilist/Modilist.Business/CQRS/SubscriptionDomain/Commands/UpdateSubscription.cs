
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SubscriptionDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.SubscriptionDomain;
using Modilist.Infrastructure.Shared.Enums;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SubscriptionDomain.Commands
{
    public class UpdateSubscription : IRequest<SubscriptionDTO>
    {
        private int _maxPricingLimit = 0;

        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string MaxPricingLimit { get; set; } = "2500";

        [JsonIgnore]
        public int MaxPricingLimitAsInt 
        { 
            get
            {
                if (!int.TryParse(MaxPricingLimit, out _maxPricingLimit))
                {

                    _maxPricingLimit = 5250;
                }
                return _maxPricingLimit; 
            }
        }

        public SubscriptionPlan Plan { get; set; } = SubscriptionPlan.InEveryMonth;
    }

    internal class UpdateSubscriptionValidator : AbstractValidator<UpdateSubscription>
    {
        public UpdateSubscriptionValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.MaxPricingLimitAsInt).NotEmpty()
                .GreaterThanOrEqualTo(1500)
                .Must(x => x % 250 == 0);
            RuleFor(x => x.Plan).NotEmpty().IsInEnum().NotEqual(SubscriptionPlan.None);
        }
    }

    internal class UpdateSubscriptionHandler : IRequestHandler<UpdateSubscription, SubscriptionDTO>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        private readonly IAccountRepository _accountRepository;

        public UpdateSubscriptionHandler(ISubscriptionRepository subscriptionRepository, IAccountRepository accountRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _accountRepository = accountRepository;
        }

        public async Task<SubscriptionDTO> Handle(UpdateSubscription request, CancellationToken cancellationToken)
        {
            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }
                        
            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            subscription.SetMaxPricingLimit(request.MaxPricingLimit);

            subscription.SetPlan(request.Plan);

            await _subscriptionRepository.UpdateAsync(subscription, cancellationToken);

            return subscription.Adapt<SubscriptionDTO>();
        }
    }
}
