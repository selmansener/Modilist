
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SubscriptionDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Domains.Models.SubscriptionDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SubscriptionDomain.Commands
{
    public class UpdateSubscriptionMaxPricingLimit : IRequest<SubscriptionDTO>
    {
        private int _maxPricingLimit = 0;

        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string MaxPricingLimit { get; set; } = "1000";

        [JsonIgnore]
        public int MaxPricingLimitAsInt 
        { 
            get
            {
                if (!int.TryParse(MaxPricingLimit, out _maxPricingLimit))
                {

                    _maxPricingLimit = 2750;
                }
                return _maxPricingLimit; 
            }
        }
    }

    internal class UpdateSubscriptionMaxPricingLimitValidator : AbstractValidator<UpdateSubscriptionMaxPricingLimit>
    {
        public UpdateSubscriptionMaxPricingLimitValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.MaxPricingLimitAsInt).NotEmpty()
                .GreaterThanOrEqualTo(500)
                .Must(x => x % 250 == 0);
        }
    }

    internal class UpdateSubscriptionMaxPricingLimitHandler : IRequestHandler<UpdateSubscriptionMaxPricingLimit, SubscriptionDTO>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public UpdateSubscriptionMaxPricingLimitHandler(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<SubscriptionDTO> Handle(UpdateSubscriptionMaxPricingLimit request, CancellationToken cancellationToken)
        {
            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            subscription.SetMaxPricingLimit(request.MaxPricingLimit);

            await _subscriptionRepository.UpdateAsync(subscription, cancellationToken);

            return subscription.Adapt<SubscriptionDTO>();
        }
    }
}
