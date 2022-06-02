
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.EntityConfigurations.StylePreferencesDomain
{
    internal class StylePreferenceEntityConfiguration : IEntityTypeConfiguration<StylePreference>
    {
        public void Configure(EntityTypeBuilder<StylePreference> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(StylePreference));

            builder.HasOne(x => x.Account)
                .WithOne(x => x.StylePreferences)
                .HasPrincipalKey<Account>(x => x.Id)
                .HasForeignKey<StylePreference>(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.PrefersHijabClothing).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.LovesShopping).IsRequired().HasDefaultValue(0);
            builder.Property(x => x.OpenToSuggestions).IsRequired().HasDefaultValue(0);
        }
    }
}
