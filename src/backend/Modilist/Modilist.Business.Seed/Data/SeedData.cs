using System.Collections.Immutable;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Business.Seed.Data
{
    internal class SeedData
    {
        public ImmutableList<Product> Products { get; private set; }

        public ImmutableList<Account> Users { get; set; }
    }
}
