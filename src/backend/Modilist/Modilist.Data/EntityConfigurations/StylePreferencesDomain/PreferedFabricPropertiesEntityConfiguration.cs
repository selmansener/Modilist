using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.EntityConfigurations.StylePreferencesDomain
{
    internal class PreferedFabricPropertiesEntityConfiguration : IEntityTypeConfiguration<PreferedFabricProperties>
    {
        public void Configure(EntityTypeBuilder<PreferedFabricProperties> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(PreferedFabricProperties)}_HiLo");

            builder.Property(x => x.Allergens).HasMaxLength(4000);
            builder.Property(x => x.AdditionalNotes).HasMaxLength(4000);
            builder.Property(x => x.ExcludedColorCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedColors).HasMaxLength(1000);
            builder.Property(x => x.ExcludedFabrics).HasMaxLength(1000);
            builder.Property(x => x.ExcludedPatterns).HasMaxLength(1000);

            builder.HasOne(x => x.Account)
                .WithOne(x => x.PreferedFabricProperties)
                .HasPrincipalKey<Account>(x => x.Id)
                .HasForeignKey<PreferedFabricProperties>(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
