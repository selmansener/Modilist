using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.UserDomain.Models;

namespace Modilist.Data.EntityConfigurations.UserDomain
{
    internal class AccountEntityConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.State).HasConversion<string>().IsRequired();
            builder.Property(x => x.Gender).HasConversion<string>().IsRequired();
        }
    }
}
