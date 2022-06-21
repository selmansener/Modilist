using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SubscriptionDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.SubscriptionDomain;

namespace Modilist.Business.CQRS.SubscriptionDomain.Commands
{
    public class CreateSubscription : IRequest<SubscriptionDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class CreateSubscriptionValidator : AbstractValidator<CreateSubscription>
    {
        public CreateSubscriptionValidator()
        {
            RuleFor(c => c.AccountId).NotEmpty();
        }
    }

    internal class CreateSubscriptionHandler : IRequestHandler<CreateSubscription, SubscriptionDTO>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IAccountRepository _accountRepository;

        public CreateSubscriptionHandler(ISubscriptionRepository subscriptionRepository, IAccountRepository accountRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _accountRepository = accountRepository;
        }

        public async Task<SubscriptionDTO> Handle(CreateSubscription request, CancellationToken cancellationToken)
        {
            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription != null)
            {
                throw new SubscriptionAlreadyExistsException(request.AccountId);
            }

            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            subscription = new Subscription(request.AccountId);

            await _subscriptionRepository.AddAsync(subscription, cancellationToken);

            account.SetSubscription(subscription.Id);

            await _accountRepository.UpdateAsync(account, cancellationToken);

            return subscription.Adapt<SubscriptionDTO>();
        }
    }
}
