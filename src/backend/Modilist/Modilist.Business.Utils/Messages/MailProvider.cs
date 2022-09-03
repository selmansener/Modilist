
using Microsoft.Extensions.Options;

using Modilist.Business.Utils.DTOs;
using Modilist.Business.Utils.Exceptions;
using Modilist.Infrastructure.Shared.Configurations;

using SendGrid;
using SendGrid.Helpers.Mail;

namespace Modilist.Business.Utils.Messages
{
    public interface IMailProvider
    {
        public Task SendMail(SendMail sendMail, CancellationToken cancellationToken);
    }

    internal class MailProvider : IMailProvider
    {
        private readonly SendGridClient _sendGridClient;

        public MailProvider(HttpClient httpClient, IOptions<SendGridOptions> options)
        {
            if (options == null || string.IsNullOrEmpty(options.Value?.APIKey))
            {
                throw new MailProviderConfigurationException("SendGridOptions object or the APIKey is possibly null. Please add the SendGridOptions with an APIKey in the appsettings.");
            }

            _sendGridClient = new SendGridClient(httpClient, new SendGridClientOptions
            {
                ApiKey = options.Value.APIKey,
            });
        }

        public async Task SendMail(SendMail sendMail, CancellationToken cancellationToken)
        {
            var message = new SendGridMessage
            {
                TemplateId = sendMail.TemplateId,
                From = new EmailAddress(sendMail.From, sendMail.SenderName),
                Personalizations = new List<Personalization>
                    {
                        new Personalization
                        {
                            TemplateData = sendMail.TemplateData,
                            Tos = new List<EmailAddress>
                            {
                                new EmailAddress(sendMail.To)
                            }
                        }
                    },
            };

            var sendMailResponse = await _sendGridClient.SendEmailAsync(message, cancellationToken);

            if (!sendMailResponse.IsSuccessStatusCode)
            {
                string? reason = await sendMailResponse?.Body?.ReadAsStringAsync(cancellationToken);

                throw new SendMailFailureException((int)sendMailResponse.StatusCode, reason);
            }
        }
    }
}
