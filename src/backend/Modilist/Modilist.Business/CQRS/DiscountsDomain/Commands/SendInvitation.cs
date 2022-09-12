
using Azure.Messaging.EventGrid;

using FluentValidation;

using MediatR;

using Microsoft.Extensions.Options;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.DiscountsDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.DiscountsDomain;
using Modilist.Infrastructure.Azure.Extensions.Configurations;
using Modilist.Infrastructure.Azure.Extensions.EventGrid;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Events;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.DiscountsDomain.Commands
{
    public class SendInvitation : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public IEnumerable<string> Emails { get; set; }
    }

    internal class SendInvitationValidator : AbstractValidator<SendInvitation>
    {
        public SendInvitationValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleForEach(x => x.Emails).EmailAddress().NotEmpty();
        }
    }

    internal class SendInvitationHandler : IRequestHandler<SendInvitation>
    {
        private readonly IExclusiveDiscountsRepository _exclusiveDiscountsRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly EventGridPublisherClient _eventGridPublisherClient;

        public SendInvitationHandler(
            IAccountRepository accountRepository,
            IExclusiveDiscountsRepository exclusiveDiscountsRepository,
            IEventGridPublisherClientFactory eventGridPublisherClientFactory,
            IOptions<EventGridClientOptions> options)
        {
            _accountRepository = accountRepository;
            _exclusiveDiscountsRepository = exclusiveDiscountsRepository;
            _eventGridPublisherClient = eventGridPublisherClientFactory.GetClient(options.Value);
        }

        public async Task<Unit> Handle(SendInvitation request, CancellationToken cancellationToken)
        {
            var account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            var exclusiveDiscounts = await _exclusiveDiscountsRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            var uniqueEmails = request.Emails.Except(exclusiveDiscounts.Select(x => x.InvitedAccountEmail)).Except(new[] { account.Email });

            var discounts = new List<ExclusiveDiscount>();
            foreach (var email in uniqueEmails)
            {
                discounts.Add(ExclusiveDiscount.CreateInvitationSentDiscount(request.AccountId, Currency.TRY, email));
            }

            await _exclusiveDiscountsRepository.AddRangeAsync(discounts, cancellationToken);

            await SendInvitations(account.Id, $"{account.FirstName} {account.LastName}", uniqueEmails, cancellationToken);

            return Unit.Value;
        }

        private async Task SendInvitations(Guid accountId, string senderName, IEnumerable<string> emails, CancellationToken cancellationToken)
        {
            if (emails.Count() == 0)
            {
                return;
            }

            var publisherId = accountId.ToString();

            List<Task> tasks = new List<Task>();
            foreach (var email in emails)
            {
                var task = Task.Factory.StartNew(_email =>
                {
                    var invitationSent = new InvitationSent(publisherId, PublisherType.Account, senderName, _email.ToString());

                    EventGridEvent invitationEvent = new EventGridEvent(
                            "AccountInvitation",
                            typeof(InvitationSent).Name,
                            invitationSent.Version,
                            invitationSent);

                    return _eventGridPublisherClient.SendEventAsync(invitationEvent, cancellationToken);
                }, email, cancellationToken);
                tasks.Add(task);
            }

            await Task.WhenAll(tasks);
        }
    }
}
