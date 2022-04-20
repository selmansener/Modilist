
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Modilist.Data.DataAccess;
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

            services.AddDbContext<ModilistWriteDbContext>(opts =>
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

            services.AddDbContext<ModilistReadDbContext>(opts =>
            {
                opts.UseSqlServer(dbConnectionString, sqlOptions =>
                {
                    sqlOptions.CommandTimeout(120);
                });

                if (environment.IsDevelopment())
                {
                    opts.EnableSensitiveDataLogging();
                }
            });

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {

            return services;
        }
    }
}
