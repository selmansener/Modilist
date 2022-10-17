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
    public class AccountActivatedBodySizeDiscountHandler
    {
        private readonly IMediator _mediator;

        public AccountActivatedBodySizeDiscountHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        [FunctionName(nameof(AccountActivatedBodySizeDiscountHandler))]
        public async Task RunAsync([EventGridTrigger] EventGridEvent eventGridEvent, ILogger log, CancellationToken cancellationToken)
        {
            var accountActivatedEvent = JsonConvert.DeserializeObject<AccountActivated>(eventGridEvent.Data.ToString());

            await _mediator.Send(new GrantBodySizeDiscount
            {
                AccountId = accountActivatedEvent.AccountId,
            }, cancellationToken);
        }
    }
}
