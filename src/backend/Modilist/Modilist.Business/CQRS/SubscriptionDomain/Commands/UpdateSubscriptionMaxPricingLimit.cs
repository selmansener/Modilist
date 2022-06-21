
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
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public int MaxPricingLimit { get; set; }
    }

    internal class UpdateSubscriptionMaxPricingLimitValidator : AbstractValidator<UpdateSubscriptionMaxPricingLimit>
    {
        public UpdateSubscriptionMaxPricingLimitValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.MaxPricingLimit)
                .NotEmpty()
                .GreaterThan(500)
                .Must(x => x % 250 == 0)
                .When(x => x.MaxPricingLimit > 500, ApplyConditionTo.CurrentValidator);
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
