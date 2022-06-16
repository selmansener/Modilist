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

            builder.HasOne(x => x.Account)
                .WithOne(x => x.FitPreferences)
                .HasPrincipalKey<Account>(x => x.Id)
                .HasForeignKey<FitPreferences>(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
