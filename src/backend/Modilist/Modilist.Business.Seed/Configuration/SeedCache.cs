using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.Seed.Configuration
{
    internal sealed class SeedCache
    {
        private readonly List<SeedServiceType> _executedServices;

        public SeedCache()
        {
            _executedServices = new List<SeedServiceType>();
        }

        public void AddExecutedService(SeedServiceType service)
        {
            _executedServices.Add(service);
        }

        public IEnumerable<SeedServiceType> FindUnexecutedServices(IEnumerable<SeedServiceType> services)
        {
            return services.Except(_executedServices);
        }

        public void Clear()
        {
            _executedServices.Clear();
        }
    }
}
