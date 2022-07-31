
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.ReturnDomain;

namespace Modilist.Data.EntityConfigurations.ReturnDomain
{
    internal class ReturnEntityConfiguration : IEntityTypeConfiguration<Return>
    {
        public void Configure(EntityTypeBuilder<Return> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(Return));

            builder.Property(x => x.State).IsRequired().HasConversion<string>();

            builder.HasOne(x => x.SalesOrder)
                .WithOne(x => x.Return)
                .HasForeignKey<Return>(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
