
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.EntityConfigurations.StylePreferencesDomain
{
    internal class StylePreferencesEntityConfiguration : IEntityTypeConfiguration<StylePreferences>
    {
        public void Configure(EntityTypeBuilder<StylePreferences> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(StylePreferences)}_HiLo");

            builder.HasOne(x => x.Account)
                .WithOne(x => x.StylePreferences)
                .HasPrincipalKey<Account>(x => x.Id)
                .HasForeignKey<StylePreferences>(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.PrefersHijabClothing).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.LovesShopping).IsRequired().HasDefaultValue(0);
            builder.Property(x => x.OpenToSuggestions).IsRequired().HasDefaultValue(0);
            builder.Property(x => x.ChoiceReasons).IsRequired().HasMaxLength(1000);
            builder.Property(x => x.BodyPartsToHighlight).HasMaxLength(1000);
            builder.Property(x => x.BodyPartsToHide).HasMaxLength(1000);
            builder.Property(x => x.ExcludedUpperCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedLowerCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedOuterCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedUnderwearCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedAccessoryCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedFootwearCategories).HasMaxLength(1000);
            builder.Property(x => x.ExcludedBagCategories).HasMaxLength(1000);
        }
    }
}
