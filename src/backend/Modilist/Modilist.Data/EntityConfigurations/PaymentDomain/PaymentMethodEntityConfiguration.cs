
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Data.EntityConfigurations.PaymentDomain
{
    internal class PaymentMethodEntityConfiguration : IEntityTypeConfiguration<PaymentMethod>
    {
        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(PaymentMethod));

            builder.HasOne(x => x.Account)
                .WithMany(x => x.PaymentMethods)
                .HasForeignKey(x => x.AccountId)
                .IsRequired();

            builder.HasIndex(x => new { x.AccountId, x.CardName, x.DeletedAt })
                .IsUnique();
        }
    }
}
