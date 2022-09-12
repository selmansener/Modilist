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
    internal class DiscountEntityConfiguration : IEntityTypeConfiguration<Discount>
    {
        public void Configure(EntityTypeBuilder<Discount> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(Discount));

            builder.ToTable($"{nameof(Discount)}s");

            builder.Property(x => x.State).IsRequired().HasConversion<string>();

            builder.Property(x => x.Type).IsRequired().HasConversion<string>();

            builder.Property(x => x.Currency).IsRequired().HasConversion<string>();
        }
    }
}
