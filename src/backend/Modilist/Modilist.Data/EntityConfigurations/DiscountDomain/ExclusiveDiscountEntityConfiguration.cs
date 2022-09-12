using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.DiscountsDomain;

namespace Modilist.Data.EntityConfigurations.DiscountDomain
{
    internal class ExclusiveDiscountEntityConfiguration : IEntityTypeConfiguration<ExclusiveDiscount>
    {
        public void Configure(EntityTypeBuilder<ExclusiveDiscount> builder)
        {
            builder.ToTable($"{nameof(ExclusiveDiscount)}s");

            builder.HasOne(x => x.Account)
                .WithMany(x => x.ExclusiveDiscounts)
                .HasForeignKey(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
