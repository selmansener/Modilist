using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Extensions.DependencyInjection;

using Modilist.Business.Utils.AddressDomain;

namespace Modilist.Business.Utils.Extensions
{
    public static class BusinessUtilExtensions
    {
        public static IServiceCollection AddBusinessUtils(this IServiceCollection services)
        {
            services.AddSingleton<IAddressService, AddressService>();

            return services;
        }
    }
}
