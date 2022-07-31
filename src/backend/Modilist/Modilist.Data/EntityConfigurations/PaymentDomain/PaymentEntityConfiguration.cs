
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Data.EntityConfigurations.PaymentDomain
{
    internal class PaymentEntityConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(Payment));

            builder.HasOne(x => x.SalesOrder)
                .WithOne(x => x.Payment)
                .HasForeignKey<Payment>(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
