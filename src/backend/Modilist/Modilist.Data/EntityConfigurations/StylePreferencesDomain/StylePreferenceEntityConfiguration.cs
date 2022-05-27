using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.StylePreferences.Models;

namespace Modilist.Data.EntityConfigurations.StylePreferencesDomain
{
    internal class StylePreferenceEntityConfiguration : IEntityTypeConfiguration<StylePreference>
    {
        public void Configure(EntityTypeBuilder<StylePreference> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(StylePreference));

            builder.HasOne(x => x.Account)
                .WithOne()
                .HasForeignKey<StylePreference>(x => x.AccountId)
                .IsRequired(false);

            builder.Property(x => x.PrefersHijabClothing).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.LovesShopping).IsRequired().HasDefaultValue(0);
            builder.Property(x => x.OpenToSuggestions).IsRequired().HasDefaultValue(0);
        }
    }
}
