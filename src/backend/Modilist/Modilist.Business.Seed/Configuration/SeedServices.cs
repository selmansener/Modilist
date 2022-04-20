using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Business.Seed.Services;

namespace Modilist.Business.Seed.Configuration
{
    internal sealed class SeedServices : Dictionary<string, Type>
    {
        public ISeedService GetService(IServiceProvider serviceProvider, SeedServiceType service)
        {
            var serviceName = service.ToString();
            if (!ContainsKey(serviceName))
            {
                throw new InvalidOperationException($"Invalid seed service: {serviceName}");
            }

            return (ISeedService)serviceProvider.GetService(this[serviceName]);
        }
    }
}
