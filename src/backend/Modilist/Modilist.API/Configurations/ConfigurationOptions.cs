﻿using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.API.Configurations
{
    internal class ConfigurationOptions
    {
        public AzureAdB2COptions AzureAdB2COptions { get; set; }

        public DbConnectionOptions ModilistDbConnectionOptions { get; set; }

        public IyzicoAPIOptions IyzicoAPIOptions { get; set; }

        public IEnumerable<string> AllowedOrigins { get; set; }

        public string DevelopmentApiKey { get; set; }

        public StorageConnectionStrings StorageConnectionStrings { get; set; }

        public SendGridOptions SendGridOptions { get; set; }
    }
}
