
using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.Functions.EventHandlers.Configurations
{
    internal class ConfigurationOptions
    {
        public DbConnectionOptions ModilistDbConnectionOptions { get; set; }

        public SendGridOptions SendGridOptions { get; set; }
    }
}
