using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.ProductDomain.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string SKU { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string SubCategory { get; set; }

        public string? Brand { get; set; }

        public decimal Price { get; set; }

        public decimal SalesPrice { get; set; }

        public int VAT { get; set; }

        public string Size { get; set; }

        public Gender Gender { get; set; }

        public IEnumerable<ProductImageDTO> Images { get; set; }
    }
}
