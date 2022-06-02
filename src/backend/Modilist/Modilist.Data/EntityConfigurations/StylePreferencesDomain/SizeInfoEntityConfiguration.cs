﻿
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.EntityConfigurations.StylePreferencesDomain
{
    internal class SizeInfoEntityConfiguration : IEntityTypeConfiguration<SizeInfo>
    {
        public void Configure(EntityTypeBuilder<SizeInfo> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(SizeInfo));

            builder.HasOne(x => x.Account)
                .WithOne(x => x.SizeInfo)
                .HasPrincipalKey<Account>(x => x.Id)
                .HasForeignKey<SizeInfo>(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}