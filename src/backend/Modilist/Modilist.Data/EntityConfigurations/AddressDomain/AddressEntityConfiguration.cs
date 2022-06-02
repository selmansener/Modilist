
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Data.EntityConfigurations.AddressDomain
{
    internal class AddressEntityConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(Address));

            builder.HasOne(x => x.Account)
                .WithMany(x => x.Addresses)
                .HasForeignKey(x => x.AccountId)
                .IsRequired();

            builder.HasIndex(x => new { x.AccountId, x.Name, x.DeletedAt })
                .IsUnique();
        }
    }
}
