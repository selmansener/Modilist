
using System.Linq.Expressions;
using System.Reflection;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.DiscountsDomain;
using Modilist.Domains.Models.PaymentDomain;
using Modilist.Domains.Models.ProductDomain;
using Modilist.Domains.Models.ReturnDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Models.StylePreferencesDomain;
using Modilist.Domains.Models.SubscriptionDomain;
using Modilist.Infrastructure.Shared.Constants;
using Modilist.Infrastructure.Shared.Models;

namespace Modilist.Data.DataAccess
{
    internal class ModilistDbContext : DbContext
    {
        public ModilistDbContext(DbContextOptions<ModilistDbContext> options) 
            : base(options)
        {
            Database.AutoTransactionsEnabled = false;
            ChangeTracker.LazyLoadingEnabled = false;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public virtual DbSet<Account> Accounts { get; set; }

        public virtual DbSet<StylePreferences> StylePreferences { get; set; }

        public virtual DbSet<Address> Addresses { get; set; }

        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }

        public virtual DbSet<SizeInfo> SizeInfos { get; set; }

        public virtual DbSet<PreferedFabricProperties> PreferedFabricProperties { get; set; }

        public virtual DbSet<Subscription> Subscriptions { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<ProductImage> ProductImages { get; set; }

        public virtual DbSet<SalesOrder> SalesOrders { get; set; }

        public virtual DbSet<SalesOrderLineItem> SalesOrderLineItems { get; set; }

        public virtual DbSet<SalesOrderAddress> SalesOrderAddresses { get; set; }

        public virtual DbSet<LineItemFeedback> LineItemFeedbacks { get; set; }

        public virtual DbSet<Return> Returns { get; set; }

        public virtual DbSet<ReturnLineItem> ReturnLineItems { get; set; }

        public virtual DbSet<ReturnAddress> ReturnAddresses { get; set; }

        public virtual DbSet<Payment> Payments { get; set; }

        public virtual DbSet<PaymentLineItem> PaymentLineItems { get; set; }

        public virtual DbSet<Discount> Discounts { get; set; }

        public virtual DbSet<ExclusiveDiscount> ExclusiveDiscounts { get; set; }

        public virtual DbSet<PublicDiscount> PublicDiscounts { get; set; }

        public virtual DbSet<SubscriptionStateLog> SubscriptionStateLogs { get; private set; }

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
