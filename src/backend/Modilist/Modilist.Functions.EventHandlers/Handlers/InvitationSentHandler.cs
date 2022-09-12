// Default URL for triggering event grid function in the local environment.
// http://localhost:7071/runtime/webhooks/EventGrid?functionName={functionname}
using System.Threading;
using System.Threading.Tasks;

using Azure.Messaging.EventGrid;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Extensions.Logging;

using Modilist.Business.Utils.Messages;
using Modilist.Infrastructure.Shared.Events;

using Newtonsoft.Json;

namespace Modilist.Functions.EventHandlers.Handlers
{
    public class InvitationSentHandler
    {
        private readonly IMailProvider _mailProvider;

        public InvitationSentHandler(IMailProvider mailProvider)
        {
            _mailProvider = mailProvider;
        }

        [FunctionName(nameof(InvitationSentHandler))]
        public async Task RunAsync([EventGridTrigger] EventGridEvent eventGridEvent, ILogger log, CancellationToken cancellationToken)
        {
            var invitationSentEvent = JsonConvert.DeserializeObject<InvitationSent>(eventGridEvent.Data.ToString());

            await _mailProvider.SendMailAsync(new Business.Utils.DTOs.SendMail
            {
                From = "invitations@modilist.com",
                To = invitationSentEvent.ReceiverEmail,
                SenderName = "Modilist Invitations",
                TemplateData = new System.Collections.Generic.Dictionary<string, string>
                {
                    { "invitationSenderName", invitationSentEvent.SenderName }
                },
                TemplateId = "d-ab5ef377dfbe424d8434b63fdb8b3d60"
            }, cancellationToken);
        }
    }
}
