using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

using Modilist.MailService.Models;

using Newtonsoft.Json;

using SendGrid;
using SendGrid.Helpers.Mail;

namespace Modilist.MailService.Functions
{
    public class SendVerificationMail
    {
        private readonly ILogger<SendVerificationMail> _logger;
        private readonly SendGridClient _sendGridClient;
        private readonly string _verificationEmailTemplateId = "d-fad2121e3baf4bda898817d589810db8";
        private readonly string _username = "modilist-sa";
        private readonly string _password = "qwe123**";
        private readonly IDictionary<string, string> _clientUrlPairs = new Dictionary<string, string>
        {
            { "70773d38-9a72-4f72-af81-17eb6737353c", "app-modilist-int-westeu.azurewebsites.net" },
            { "ecf4b6c9-62d3-4f93-abc3-640ff5d0f6e8", "app-modilist-staging-westeu.azurewebsites.net" },
            { "c2a43089-5855-4fa3-a46c-41fa67ac0ae4", "app-modilist-prod-westeu.azurewebsites.net" }
        };

        public SendVerificationMail(ILogger<SendVerificationMail> log, SendGridClient sendGridClient)
        {
            _logger = log;
            _sendGridClient = sendGridClient;
        }

        [FunctionName(nameof(SendVerificationMail))]
        [OpenApiOperation(operationId: nameof(SendVerificationMail))]
        [OpenApiParameter("Authorization", In = ParameterLocation.Header, Required = true, Type = typeof(string), Visibility = OpenApiVisibilityType.Important)]
        [OpenApiRequestBody("application/json", typeof(BeforeAccountCreatePayload), Description = "ClientId of the application and Email of account.", Example = typeof(BeforeAccountCreatePayload), Required = true)]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.OK)]
        public async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "SendVerificationMail")] HttpRequest req, CancellationToken cancellationToken)
        {
            var authResult = Authentication(req);
            if (!authResult)
            {
                return new UnauthorizedResult();
            }


            if (req.Body == null)
            {
                throw new System.Exception("Body is required");
            }

            using (StreamReader streamReader = new StreamReader(req.Body, Encoding.UTF8))
            {
                var body = streamReader.ReadToEnd();

                if (string.IsNullOrEmpty(body))
                {
                    throw new System.Exception("Body is required");
                }

                var payload = JsonConvert.DeserializeObject<BeforeAccountCreatePayload>(body);

                if (string.IsNullOrEmpty(payload.Email))
                {
                    throw new System.Exception("Email is required");
                }

                if (string.IsNullOrEmpty(payload.ClientId))
                {
                    throw new System.Exception("ClientId is required");
                }

                if (!_clientUrlPairs.TryGetValue(payload.ClientId, out var _url))
                {
                    throw new Exception($"Unknown client id: {payload.ClientId}");
                }

                var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                var url = environment == "Development" ? "localhost:5088" : _url;

                var message = new SendGridMessage
                {
                    TemplateId = _verificationEmailTemplateId,
                    From = new EmailAddress("noreply@modilist.com", "Modilist hesabınızı doğrulayın!"),
                    Personalizations = new List<Personalization>
                    {
                        new Personalization
                        {
                            TemplateData = new Dictionary<string, string>
                            {
                                { "verificationUrl", url },
                                { "email", payload.Email},
                            },
                            Tos = new List<EmailAddress>
                            {
                                new EmailAddress(payload.Email)
                            }
                        }
                    },
                };

                var sendMailResponse = await _sendGridClient.SendEmailAsync(message, cancellationToken);

                if (sendMailResponse.IsSuccessStatusCode)
                {
                    return new OkResult();
                }
                else
                {
                    var sendMailResponseBody = await sendMailResponse.Body.ReadAsStringAsync();

                    _logger.LogError("Sending verification mail failed for {email}. SendGrid response: {response}", payload.Email, sendMailResponseBody);

                    return new StatusCodeResult(500);
                }
            }
        }

        private bool Authentication(HttpRequest req)
        {
            try
            {
                if (!req.Headers.TryGetValue("authorization", out var token))
                {
                    return false;
                }

                byte[] data = Convert.FromBase64String(token.ToString().Replace("Basic ", ""));
                string decodedString = Encoding.UTF8.GetString(data);
                var credentials = decodedString.Split(":");
                var username = credentials.First();
                var password = credentials.Last();

                return username == _username && password == _password;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Authorization failed");
                return false;
            }
        }
    }
}

