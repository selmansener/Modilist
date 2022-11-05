using System;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Data.EntityConfigurations.SalesOrderDomain
{
    public class BillingAddressEntityConfiguration : IEntityTypeConfiguration<BillingAddress>
    {
        public void Configure(EntityTypeBuilder<BillingAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(BillingAddress));

            builder.HasOne(x => x.SalesOrder)
                .WithOne(x => x.BillingAddress)
                .HasForeignKey<BillingAddress>(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.FullAddress).HasMaxLength(2500);

            builder.Property(x => x.BillingType).IsRequired().HasDefaultValue(BillingType.None).HasConversion<string>();

        }
    }
}

