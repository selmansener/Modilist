using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderAddressEntityConfiguration : IEntityTypeConfiguration<SalesOrderAddress>
    {
        public void Configure(EntityTypeBuilder<SalesOrderAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(SalesOrderAddress));

            builder.HasOne(x => x.SalesOrder)
                .WithOne(x => x.SalesOrderAddress)
                .HasForeignKey<SalesOrderAddress>(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.FullAddress).HasMaxLength(2500);
        }
    }
}
