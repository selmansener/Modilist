using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.ReturnDomain;

namespace Modilist.Data.EntityConfigurations.ReturnDomain
{
    internal class ReturnAddressEntityConfiguration : IEntityTypeConfiguration<ReturnAddress>
    {
        public void Configure(EntityTypeBuilder<ReturnAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(ReturnAddress));

            builder.HasOne(x => x.Return)
                .WithOne(x => x.ReturnAddress)
                .HasForeignKey<ReturnAddress>(x => x.ReturnId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.FullAddress).HasMaxLength(2500);
        }
    }
}
