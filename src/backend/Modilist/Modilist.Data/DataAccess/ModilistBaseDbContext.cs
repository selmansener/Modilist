﻿using System.Linq.Expressions;
using System.Reflection;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

using Modilist.Domains.Base;
using Modilist.Domains.ProductDomain.Models;
using Modilist.Infrastructure.Shared.Constants;
using Modilist.Infrastructure.Shared.Models;

namespace Modilist.Data.DataAccess
{
    internal class ModilistBaseDbContext : DbContext
    {
        internal ModilistBaseDbContext(DbContextOptions<ModilistReadDbContext> options) : base(options)
        {
            Database.AutoTransactionsEnabled = false;
            ChangeTracker.LazyLoadingEnabled = false;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        internal ModilistBaseDbContext(DbContextOptions<ModilistWriteDbContext> options) : base(options)
        {
            Database.AutoTransactionsEnabled = false;
            ChangeTracker.LazyLoadingEnabled = false;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public virtual DbSet<Product> Products { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            var entityTypes = GetEntityTypes(builder).ToList();

            AddDefaultMaxLength(builder, entityTypes);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            AddDeletedAtQueryFilter(builder, entityTypes.Where(x => x.BaseType == null));
            AddDeletedAtIsNullFilterToNonClusteredIndexes(builder, entityTypes);

            base.OnModelCreating(builder);
        }

        private IEnumerable<IMutableEntityType> GetEntityTypes(ModelBuilder builder)
        {
            return builder.Model.GetEntityTypes().Where(x => typeof(IBaseEntity).IsAssignableFrom(x.ClrType));
        }

        private void AddDefaultMaxLength(ModelBuilder builder, IEnumerable<IMutableEntityType> entityTypes)
        {
            var valueObjectInterfaceType = typeof(IValueObject);

            foreach (var entityType in entityTypes)
            {
                var entityClrType = entityType.ClrType;
                var entityTypeBuilder = builder.Entity(entityClrType);
                var properties = entityClrType.GetProperties();

                var stringProperties = properties.Where(x => x.PropertyType == typeof(string));

                foreach (var stringPropertyInfo in stringProperties)
                {
                    entityTypeBuilder
                        .Property(stringPropertyInfo.PropertyType, stringPropertyInfo.Name)
                        .HasMaxLength(DbContextConstants.DEFAULT_MAX_LENGTH_FOR_STRING);
                }

                var enumProperties = properties.Where(x => x.PropertyType.IsEnum);

                foreach (var enumPropertyInfo in enumProperties)
                {
                    entityTypeBuilder
                        .Property(enumPropertyInfo.PropertyType, enumPropertyInfo.Name)
                        .HasMaxLength(DbContextConstants.DEFAULT_MAX_LENGTH_FOR_STRING);
                }

                var valueObjectProperties = properties.Where(x => valueObjectInterfaceType.IsAssignableFrom(x.PropertyType));

                foreach (var valueObjectPropertyInfo in valueObjectProperties)
                {
                    var ownedTypeBuilder = entityTypeBuilder.OwnsOne(valueObjectPropertyInfo.PropertyType, valueObjectPropertyInfo.Name);
                    var props = valueObjectPropertyInfo.PropertyType.GetProperties();

                    var stringProps = props.Where(x => x.PropertyType == typeof(string));
                    var enumProps = props.Where(x => x.PropertyType.IsEnum);

                    foreach (var stringPropInfo in stringProps)
                    {
                        ownedTypeBuilder
                            .Property(stringPropInfo.PropertyType, stringPropInfo.Name)
                            .HasMaxLength(DbContextConstants.DEFAULT_MAX_LENGTH_FOR_STRING);
                    }

                    foreach (var enumPropInfo in enumProps)
                    {
                        ownedTypeBuilder
                            .Property(enumPropInfo.PropertyType, enumPropInfo.Name)
                            .HasMaxLength(DbContextConstants.DEFAULT_MAX_LENGTH_FOR_STRING);
                    }
                }
            }
        }

        private void AddDeletedAtQueryFilter(ModelBuilder builder, IEnumerable<IMutableEntityType> entityTypes)
        {
            foreach (var entityType in entityTypes)
            {
                var entityClrType = entityType.ClrType;
                var parameter = Expression.Parameter(entityClrType, "p");
                var deletedAtProperty = entityClrType.GetProperty(nameof(BaseEntity.DeletedAt));
                var deletedAtNullExpression = Expression.Equal(Expression.Property(parameter, deletedAtProperty), Expression.Constant(null, typeof(DateTime?)));
                var filter = Expression.Lambda(deletedAtNullExpression, parameter);
                var entityTypeBuilder = builder.Entity(entityClrType);
                entityTypeBuilder.HasQueryFilter(filter);
            }
        }

        private void AddDeletedAtIsNullFilterToNonClusteredIndexes(ModelBuilder builder, IEnumerable<IMutableEntityType> entityTypes)
        {
            string deletedAtIndexFilter = $"[{nameof(BaseEntity.DeletedAt)}] IS NULL";
            string deletedAtNotNullIndexFilter = $"[{nameof(BaseEntity.DeletedAt)}] IS NOT NULL";

            foreach (var entityType in entityTypes)
            {
                var entityClrType = entityType.ClrType;
                var entityTypeBuilder = builder.Entity(entityClrType);

                var nonClusteredIndexesWithDeletedAt = entityTypeBuilder.Metadata.GetIndexes().Where(i =>
                    (
                        !i.IsClustered().HasValue ||
                            (i.IsClustered().HasValue && !i.IsClustered().Value)
                    )
                    && i.Properties.Any(p => p.Name == nameof(BaseEntity.DeletedAt)));

                foreach (var index in nonClusteredIndexesWithDeletedAt)
                {
                    var indexFilter = index.GetFilter();
                    if (!string.IsNullOrEmpty(indexFilter) && indexFilter.Contains(deletedAtNotNullIndexFilter))
                    {
                        indexFilter = indexFilter.Replace(deletedAtNotNullIndexFilter, deletedAtIndexFilter);
                    }
                    else
                    {
                        indexFilter = deletedAtIndexFilter;
                    }

                    index.SetFilter(indexFilter);
                }
            }
        }
    }
}