using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.ProductDomain.Models;

namespace Modilist.Business.Seed.Data
{
    internal class SeedData
    {
        public ImmutableList<Product> Products { get; private set; }
    }
}
