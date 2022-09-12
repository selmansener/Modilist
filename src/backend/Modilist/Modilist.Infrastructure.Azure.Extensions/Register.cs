using Microsoft.Extensions.DependencyInjection;

using Modilist.Infrastructure.Azure.Extensions.BlobStorage;
using Modilist.Infrastructure.Azure.Extensions.EventGrid;

namespace Modilist.Infrastructure.Azure.Extensions
{
    public static class Register
    {
        public static IServiceCollection AddBlobClientFactory(this IServiceCollection services)
        {
            services.AddScoped<IBlobClientFactory, BlobClientFactory>();
            services.AddScoped<IEventGridPublisherClientFactory, EventGridPublisherClientFactory>();

            return services;
        }
    }
}