
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderEntityConfiguration : IEntityTypeConfiguration<SalesOrder>
    {
        public void Configure(EntityTypeBuilder<SalesOrder> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(SalesOrder));

            builder.Property(x => x.State).IsRequired().HasConversion<string>();
        }
    }
}
