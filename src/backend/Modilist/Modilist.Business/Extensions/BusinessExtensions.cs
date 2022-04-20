using System.Reflection;

using MediatR;
using MediatR.Extensions.FluentValidation.AspNetCore;

using Microsoft.Extensions.DependencyInjection;

namespace Modilist.Business.Extensions
{
    public static class BusinessExtensions
    {
        public static IServiceCollection AddCQRS(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            services.AddMediatR(assembly);
            services.AddFluentValidation(new[] { assembly });

            return services;
        }
    }
}
