using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

using SendGrid;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

[assembly: FunctionsStartup(typeof(Modilist.MailService.Startup))]
namespace Modilist.MailService
{
    internal class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddHttpClient<SendGridClient, SendGridClient>(client =>
            {
                return new SendGridClient(client, new SendGridClientOptions
                {
                    ApiKey = "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"
                });
            });
        }
    }
}
