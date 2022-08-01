using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Modilist.Business.Extensions;
using Modilist.Data.Extensions;
using Modilist.Functions.ScheduledJobs.Configurations;

using Newtonsoft.Json;

[assembly: FunctionsStartup(typeof(Modilist.Functions.ScheduledJobs.Startup))]
namespace Modilist.Functions.ScheduledJobs
{
    internal class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var options = GetConfigurations();

            var environment = builder.Services.BuildServiceProvider().GetService<IHostEnvironment>();

            builder.Services.AddDataAccess(options.ModilistDbConnectionOptions, environment);

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
            using (var stream = assembly.GetManifestResourceStream($"Modilist.Functions.ScheduledJobs.Settings.appsettings.{environment}.json"))
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
