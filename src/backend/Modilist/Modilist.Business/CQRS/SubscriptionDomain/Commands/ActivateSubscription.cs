using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Domains.Models.SubscriptionDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SubscriptionDomain.Commands
{
    public class ActivateSubscription : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class ActivateSubscriptionValidator : AbstractValidator<ActivateSubscription>
    {
        public ActivateSubscriptionValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class ActivateSubscriptionHandler : IRequestHandler<ActivateSubscription>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public ActivateSubscriptionHandler(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<Unit> Handle(ActivateSubscription request, CancellationToken cancellationToken)
        {
            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            subscription.Activate();

            await _subscriptionRepository.UpdateAsync(subscription, cancellationToken);

            return Unit.Value;
        }
    }
}
