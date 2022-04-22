using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.API.Configurations
{
    public class ConfigurationOptions
    {
        public AzureAdB2COptions AzureAdB2COptions { get; set; }

        public DbConnectionOptions ModilistDbConnectionOptions { get; set; }

        public IEnumerable<string> AllowedOrigins { get; set; }
    }
}
