
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.DiscountsDomain;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Data.Repositories.ProductDomain;
using Modilist.Data.Repositories.ReturnDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Data.Transactions;
using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.Data.Extensions
{
    public static class DataExtensions
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services, DbConnectionOptions dbConnectionOptions, IHostEnvironment environment)
        {
            string dbConnectionString = new SqlConnectionStringBuilder
            {
                DataSource = dbConnectionOptions.Server,
                UserID = dbConnectionOptions.UserName,
                Password = dbConnectionOptions.Password,
                InitialCatalog = dbConnectionOptions.Database
            }.ConnectionString;

            services.AddDbContext<ModilistDbContext>(opts =>
            {
                if (environment.IsDevelopment())
                {
                    opts.EnableSensitiveDataLogging();
                }

                opts.UseSqlServer(dbConnectionString, sqlOptions =>
                {
                    sqlOptions.CommandTimeout(120);
                });
            });

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAccountRepository, AccountRepository>();

            services.AddScoped<IStylePreferencesRepository, StylePreferencesRepository>();

            services.AddScoped<IAddressRepository, AddressRepository>();

            services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();

            services.AddScoped<ISizeInfoRepository, SizeInfoRepository>();

            services.AddScoped<IPreferedFabricPropertiesRepository, PreferedFabricPropertiesRepository>();

            services.AddScoped<IFitPreferencesRepository, FitPreferencesRepository>();

            services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();

            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<ISalesOrderRepository, SalesOrderRepository>();

            services.AddScoped<IReturnRepository, ReturnRepository>();

            services.AddScoped<IPaymentRepository, PaymentRepository>();

            services.AddScoped<IDiscountsRepository, DiscountsRepository>();

            services.AddScoped<IExclusiveDiscountsRepository, ExclusiveDiscountsRepository>();

            return services;
        }

        public static IServiceCollection AddTransactionManager(this IServiceCollection services, RegistrationType registrationType = RegistrationType.Scoped)
        {
            switch (registrationType)
            {
                case RegistrationType.Singleton:
                    services.AddSingleton<ITransactionManager, TransactionManager>();
                    break;
                case RegistrationType.Scoped:
                    services.AddScoped<ITransactionManager, TransactionManager>();
                    break;
                case RegistrationType.Transient:
                    services.AddTransient<ITransactionManager, TransactionManager>(provider =>
                    {
                        return new TransactionManager(provider.GetRequiredService<ModilistDbContext>(), shouldDisposeDbContext: false);
                    });
                    break;
                default:
                    throw new InvalidOperationException($"Unknown registration type sent: {registrationType}");
            }

            return services;
        }
    }

    public enum RegistrationType
    {
        Singleton,
        Scoped,
        Transient
    }
}
