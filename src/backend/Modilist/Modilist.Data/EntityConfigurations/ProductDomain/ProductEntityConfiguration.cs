﻿
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Data.EntityConfigurations.ProductDomain
{
    internal class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(Product));

            builder.HasIndex(x => new { x.SKU, x.DeletedAt })
                .IsUnique();

            builder.Property(x => x.Gender).HasConversion<string>();
        }
    }
}
