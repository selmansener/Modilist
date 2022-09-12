using System.Threading;
using System.Threading.Tasks;

using Azure.Messaging.EventGrid;

using MediatR;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Extensions.Logging;

using Modilist.Business.CQRS.DiscountsDomain.Commands;
using Modilist.Infrastructure.Shared.Events;

using Newtonsoft.Json;

namespace Modilist.Functions.EventHandlers.Handlers
{
    public class AccountActivatedNewMemberDiscountHandler
    {
        private readonly IMediator _mediator;

        public AccountActivatedNewMemberDiscountHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        [FunctionName(nameof(AccountActivatedNewMemberDiscountHandler))]
        public async Task RunAsync([EventGridTrigger] EventGridEvent eventGridEvent, ILogger log, CancellationToken cancellationToken)
        {
            var accountActivatedEvent = JsonConvert.DeserializeObject<AccountActivated>(eventGridEvent.Data.ToString());

            await _mediator.Send(new CreateNewMemberDiscount
            {
                AccountId = accountActivatedEvent.AccountId
            }, cancellationToken);
        }
    }
}
