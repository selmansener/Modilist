
using Modilist.Domains.Base;

namespace Modilist.Domains.ProductDomain.Models
{
    public class Product : BaseEntity
    {
        protected Product() { }

        public Product(string sku, string name)
        {
            SKU = sku;
            Name = name;
        }

        public string SKU { get; private set; }

        public string Name { get; private set; }
    }
}
