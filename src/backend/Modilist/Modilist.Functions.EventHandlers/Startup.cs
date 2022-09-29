using System;
using System.IO;
using System.Text;

using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Modilist.Business.Extensions;
using Modilist.Business.Utils.Extensions;
using Modilist.Data.Extensions;
using Modilist.Functions.EventHandlers.Configurations;
using Modilist.Infrastructure.Shared.Configurations;

using Newtonsoft.Json;

[assembly: FunctionsStartup(typeof(Modilist.Functions.EventHandlers.Startup))]
namespace Modilist.Functions.EventHandlers
{
    internal class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configurations = GetConfigurations();

            builder.Services.Configure<SendGridOptions>(options =>
            {
                options.APIKey = configurations.SendGridOptions.APIKey;
            });

            builder.Services.Configure<LogicAppUrls>(options =>
            {
                options.NewAccountNotificationHandler = configurations.LogicAppUrls.NewAccountNotificationHandler;
            });

            builder.Services.AddBusinessUtils();

            var environment = builder.Services.BuildServiceProvider().GetService<IHostEnvironment>();

            builder.Services.AddDataAccess(configurations.ModilistDbConnectionOptions, environment);

            builder.Services.AddRepositories();

            builder.Services.AddCQRS();

            builder.Services.AddTransactionManager(RegistrationType.Transient);

            builder.Services.AddLoggingBehavior();

            builder.Services.AddValidationBehavior();

            builder.Services.AddTransactionBehavior();

            builder.Services.BuildServiceProvider();
        }

        public ConfigurationOptions GetConfigurations()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var assembly = typeof(Startup).Assembly;
            using (var stream = assembly.GetManifestResourceStream($"Modilist.Functions.EventHandlers.Settings.appsettings.{environment}.json"))
            using (var reader = new StreamReader(stream, Encoding.UTF8))
            {
                string options = reader.ReadToEnd();
                if (string.IsNullOrEmpty(options))
                {
                    throw new InvalidOperationException($"Could not load appsettings file.");
                }

                return JsonConvert.DeserializeObject<ConfigurationOptions>(options);
            }
        }
    }
}
