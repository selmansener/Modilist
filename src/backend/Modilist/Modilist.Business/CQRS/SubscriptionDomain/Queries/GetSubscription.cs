using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SubscriptionDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Domains.Models.SubscriptionDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SubscriptionDomain.Queries
{
    public class GetSubscription : IRequest<SubscriptionDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class GetSubscriptionValidator : AbstractValidator<GetSubscription>
    {
        public GetSubscriptionValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetSubscriptionHandler : IRequestHandler<GetSubscription, SubscriptionDTO>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public GetSubscriptionHandler(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<SubscriptionDTO> Handle(GetSubscription request, CancellationToken cancellationToken)
        {
            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            return subscription.Adapt<SubscriptionDTO>();
        }
    }
}
