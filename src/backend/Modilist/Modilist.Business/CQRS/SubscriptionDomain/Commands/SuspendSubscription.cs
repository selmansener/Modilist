
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Domains.Models.SubscriptionDomain;
using Modilist.Infrastructure.Shared.Enums;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SubscriptionDomain.Commands
{
    public class SuspendSubscription : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public IEnumerable<SubscriptionSuspentionReason> SuspentionReasons { get; set; } = new List<SubscriptionSuspentionReason>();
    }

    internal class SuspendSubscriptionValidator : AbstractValidator<SuspendSubscription>
    {
        public SuspendSubscriptionValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class SuspendSubscriptionHandler : IRequestHandler<SuspendSubscription>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public SuspendSubscriptionHandler(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<Unit> Handle(SuspendSubscription request, CancellationToken cancellationToken)
        {
            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            // TODO: check if there is any active sales order in shipped state or any return

            subscription.Suspend(request.SuspentionReasons);

            await _subscriptionRepository.UpdateAsync(subscription, cancellationToken);

            return Unit.Value;
        }
    }
}
