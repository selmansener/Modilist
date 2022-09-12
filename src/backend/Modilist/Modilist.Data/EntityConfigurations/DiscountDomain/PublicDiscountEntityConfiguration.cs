
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.DiscountsDomain;

namespace Modilist.Data.EntityConfigurations.DiscountDomain
{
    internal class PublicDiscountEntityConfiguration : IEntityTypeConfiguration<PublicDiscount>
    {
        public void Configure(EntityTypeBuilder<PublicDiscount> builder)
        {
            builder.ToTable($"{nameof(PublicDiscount)}s");

            builder.HasMany(x => x.Accounts)
                .WithMany(x => x.PublicDiscounts)
                .UsingEntity<PublicDiscountAccount>(
                    x => x.HasOne(x => x.Account)
                        .WithMany()
                        .HasForeignKey(x => x.AccountId),
                    x => x.HasOne(x => x.PublicDiscount)
                        .WithMany()
                        .HasForeignKey(x => x.PublicDiscountId)
                );
        }
    }
}
