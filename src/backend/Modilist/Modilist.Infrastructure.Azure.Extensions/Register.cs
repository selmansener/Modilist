using Microsoft.Extensions.DependencyInjection;

using Modilist.Infrastructure.Azure.Extensions.BlobStorage;

namespace Modilist.Infrastructure.Azure.Extensions
{
    public static class Register
    {
        public static IServiceCollection AddBlobClientFactory(this IServiceCollection services)
        {
            services.AddScoped<IBlobClientFactory, BlobClientFactory>();

            return services;
        }
    }
}