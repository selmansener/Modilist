
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Data.EntityConfigurations.SalesOrderDomain
{
    internal class LineItemFeedbackEntitConfiguration : IEntityTypeConfiguration<LineItemFeedback>
    {
        public void Configure(EntityTypeBuilder<LineItemFeedback> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(LineItemFeedback));

            builder.HasOne(x => x.SalesOrderLineItem)
                .WithOne(x => x.Feedback)
                .HasForeignKey<LineItemFeedback>(x => x.SalesOrderLineItemId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.AdditionalNotes).HasMaxLength(2500);
        }
    }
}
