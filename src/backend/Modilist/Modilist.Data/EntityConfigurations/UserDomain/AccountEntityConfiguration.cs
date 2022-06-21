﻿
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.EntityConfigurations.UserDomain
{
    internal class AccountEntityConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.State).HasConversion<string>().IsRequired();
            builder.Property(x => x.Gender).HasConversion<string>().IsRequired();

            //builder.Navigation(x => x.Addresses)
            //    .HasField("_addresses")
            //    .UsePropertyAccessMode(PropertyAccessMode.Field);
            //builder.Navigation(x => x.PaymentMethods)
            //    .HasField("_paymentMethods")
            //    .UsePropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
