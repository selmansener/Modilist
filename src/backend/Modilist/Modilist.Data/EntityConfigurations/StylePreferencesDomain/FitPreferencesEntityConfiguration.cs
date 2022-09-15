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
    internal class FitPreferencesEntityConfiguration : IEntityTypeConfiguration<FitPreferences>
    {
        public void Configure(EntityTypeBuilder<FitPreferences> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(FitPreferences)}_HiLo");

            builder.Property(x => x.UpperFit).HasMaxLength(1000);
            builder.Property(x => x.LowerFit).HasMaxLength(1000);
            builder.Property(x => x.FootType).HasMaxLength(1000);
            builder.Property(x => x.SkirtDressLength).HasMaxLength(1000);
            builder.Property(x => x.ShortsLength).HasMaxLength(1000);
            builder.Property(x => x.LegFit).HasMaxLength(1000);

            builder.HasOne(x => x.Account)
                .WithOne(x => x.FitPreferences)
                .HasPrincipalKey<Account>(x => x.Id)
                .HasForeignKey<FitPreferences>(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
