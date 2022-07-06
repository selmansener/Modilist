
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderLineItemEntityConfiguration : IEntityTypeConfiguration<SalesOrderLineItem>
    {
        public void Configure(EntityTypeBuilder<SalesOrderLineItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(SalesOrderLineItem));

            builder.HasOne(x => x.SalesOrder)
                .WithMany(x => x.LineItems)
                .HasForeignKey(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.State).HasDefaultValue(SalesOrderLineItemState.None).IsRequired().HasConversion<string>();
        }
    }
}
