namespace Modilist.Business.CQRS.ProductDomain.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string SKU { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string? Brand { get; set; }
    }
}
