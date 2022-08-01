using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.Functions.ScheduledJobs.Configurations
{
    internal class ConfigurationOptions
    {
        public DbConnectionOptions ModilistDbConnectionOptions { get; set; }
    }
}
