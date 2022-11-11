using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Azure.Messaging.EventGrid;

using MediatR;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Extensions.Logging;

using Modilist.Business.CQRS.SalesOrderDomain.Commands;
using Modilist.Infrastructure.Shared.Events;

using Newtonsoft.Json;

namespace Modilist.Functions.EventHandlers.Handlers
{
    public class AccountActivatedCreateFirstOrderHandler
    {
        private readonly IMediator _mediator;

        public AccountActivatedCreateFirstOrderHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        [FunctionName(nameof(AccountActivatedCreateFirstOrderHandler))]
        public async Task RunAsync([EventGridTrigger] EventGridEvent eventGridEvent, ILogger log, CancellationToken cancellationToken)
        {
            var accountActivatedEvent = JsonConvert.DeserializeObject<AccountActivated>(eventGridEvent.Data.ToString());

            await _mediator.Send(new CreateFirstSalesOrder
            {
                AccountId = accountActivatedEvent.AccountId,
            }, cancellationToken);
        }
    }
}
