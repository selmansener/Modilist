
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Data.Repositories.StylePreferencesDomain;
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
            services.AddScoped<IAccountReadRepository, AccountReadRepository>();
            services.AddScoped<IAccountWriteRepository, AccountWriteRepository>();

            services.AddScoped<IStylePreferencesReadRepository, StylePreferencesReadRepository>();
            services.AddScoped<IStylePreferencesWriteRepository, StylePreferencesWriteRepository>();

            services.AddScoped<IAddressReadRepository, AddressReadRepository>();
            services.AddScoped<IAddressWriteRepository, AddressWriteRepository>();

            services.AddScoped<IPaymentMethodWriteRepository, PaymentMethodWriteRepository>();

            return services;
        }

        public static IServiceCollection AddTransactionManager(this IServiceCollection services)
        {
            services.AddScoped<ITransactionManager, TransactionManager>();

            return services;
        }
    }
}
