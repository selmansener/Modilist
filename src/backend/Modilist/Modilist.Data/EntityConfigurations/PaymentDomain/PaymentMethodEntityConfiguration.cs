using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.PaymentDomain.Models;

namespace Modilist.Data.EntityConfigurations.PaymentDomain
{
    internal class PaymentMethodEntityConfiguration : IEntityTypeConfiguration<PaymentMethod>
    {
        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Account)
                .WithMany()
                .HasForeignKey(x => x.AccountId)
                .IsRequired();

            builder.HasIndex(x => new { x.AccountId, x.CardUserKey, x.DeletedAt })
                .IsUnique();

            builder.Property(x => x.CardUserKey).IsRequired();
        }
    }
}
