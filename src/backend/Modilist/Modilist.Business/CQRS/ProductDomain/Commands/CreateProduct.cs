using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.ProductDomain.Commands
{
    internal class CreateProduct
    {
        public CreateProduct(string sku, string name)
        {
            SKU = sku;
            Name = name;
        }

        public string SKU { get; private set; }

        public string Name { get; private set; }
    }
}
