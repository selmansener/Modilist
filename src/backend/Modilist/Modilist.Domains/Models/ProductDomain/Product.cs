
using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Domains.Models.ProductDomain
{
    public class Product : BaseEntity
    {
        private readonly List<ProductImage> _images = new List<ProductImage>();

        protected Product() { }

        public Product(string sku, string name, string category, string subCategory, decimal purchasePrice, int vat, int profitRate, string size, string brand, Gender gender)
        {
            SKU = sku;
            Name = name;
            Category = category;
            SubCategory = subCategory;
            Brand = brand;
            PurchasePrice = purchasePrice;
            ProfitRate = profitRate;
            Price = CalculatePrice(purchasePrice, profitRate);
            SalesPrice = CalculateSalesPrice(purchasePrice, profitRate, vat);
            VAT = vat;
            Size = size;
            Gender = gender;
        }

        public string SKU { get; private set; }

        public string Name { get; private set; }

        public string Category { get; private set; }

        public string SubCategory { get; private set; }

        public string Brand { get; private set; }

        public decimal PurchasePrice { get; private set; }

        public decimal SalesPrice { get; private set; }

        public decimal Price { get; private set; }

        public int ProfitRate { get; private set; }

        public int VAT { get; private set; }

        public string Size { get; private set; }

        public bool NonReturnable { get; private set; } = false;

        public Gender Gender { get; private set; }

        public IReadOnlyList<ProductImage> Images => _images;

        public void AddImage(
            string name,
            string contentType,
            string url,
            string? extension = null)
        {
            _images.Add(new ProductImage(Id, name, contentType, url, extension));
        }

        private decimal CalculatePrice(decimal purchasePrice, int profitRate)
        {
            return purchasePrice + (purchasePrice * profitRate / 100);
        }

        private decimal CalculateSalesPrice(decimal purchasePrice, int profitRate, int vat)
        {
            decimal salesPrice = purchasePrice + (purchasePrice * profitRate / 100);

            return salesPrice + (salesPrice * vat / 100);
        }
    }
}
