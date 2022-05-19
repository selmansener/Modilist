using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.ProductDomain.Models;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Business.Seed.Data
{
    internal class SeedData
    {
        public ImmutableList<Product> Products { get; private set; }

        public ImmutableList<Account> Users { get; set; }
    }
}
