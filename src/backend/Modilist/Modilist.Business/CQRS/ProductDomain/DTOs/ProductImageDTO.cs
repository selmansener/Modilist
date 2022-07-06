namespace Modilist.Business.CQRS.ProductDomain.DTOs
{
    public class ProductImageDTO
    {
        public string Name { get; set; }

        public string ContentType { get; set; }

        public string Extension { get; set; }

        public string Url { get; set; }

        public ImageVariantDTO Variants { get; set; }
    }
}
