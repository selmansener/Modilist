
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.ReturnDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Data.EntityConfigurations.ReturnDomain
{
    internal class ReturnLineItemEntityConfiguration : IEntityTypeConfiguration<ReturnLineItem>
    {
        public void Configure(EntityTypeBuilder<ReturnLineItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(ReturnLineItem));

            builder.HasOne(x => x.Return)
                .WithMany(x => x.LineItems)
                .HasForeignKey(x => x.ReturnId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.State).HasDefaultValue(ReturnLineItemState.None).IsRequired().HasConversion<string>();
        }
    }
}
