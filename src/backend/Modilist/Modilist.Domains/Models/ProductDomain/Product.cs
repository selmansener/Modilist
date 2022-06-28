
using Modilist.Domains.Base;

namespace Modilist.Domains.Models.ProductDomain
{
    public class Product : BaseEntity
    {
        private readonly List<ProductImage> _images = new List<ProductImage>();

        protected Product() { }

        public Product(string sku, string name, string category, string? brand = null)
        {
            SKU = sku;
            Name = name;
            Category = category;
            Brand = brand;
        }

        public string SKU { get; private set; }

        public string Name { get; private set; }

        public string Category { get; private set; }

        public string? Brand { get; private set; }

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
