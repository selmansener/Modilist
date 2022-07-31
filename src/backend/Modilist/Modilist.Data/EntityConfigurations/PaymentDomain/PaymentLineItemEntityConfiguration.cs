
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Data.EntityConfigurations.PaymentDomain
{
    internal class PaymentLineItemEntityConfiguration : IEntityTypeConfiguration<PaymentLineItem>
    {
        public void Configure(EntityTypeBuilder<PaymentLineItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(PaymentLineItem));
        }
    }
}
