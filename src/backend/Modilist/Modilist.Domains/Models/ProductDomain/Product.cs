
using Modilist.Domains.Base;

namespace Modilist.Domains.Models.ProductDomain
{
    public class Product : BaseEntity
    {
        private readonly List<ProductImage> _images = new List<ProductImage>();

        protected Product() { }

        public Product(string sku, string name, string category, decimal price, int vat, string size, string brand)
        {
            SKU = sku;
            Name = name;
            Category = category;
            Brand = brand;
            Price = price;
            PriceWithoutVAT = (100 * price) / (100 + vat);
            VAT = vat;
            Size = size;
        }

        public string SKU { get; private set; }

        public string Name { get; private set; }

        public string Category { get; private set; }

        public string Brand { get; private set; }

        public decimal PriceWithoutVAT { get; private set; }

        public decimal Price { get; private set; }

        public int VAT { get; private set; }

        public string Size { get; private set; }

        public IReadOnlyList<ProductImage> Images => _images;

        public void AddImage(
            string name,
            string contentType,
            string url,
            string? extension = null)
        {
            _images.Add(new ProductImage(Id, name, contentType, url, extension));
        }
    }
}
