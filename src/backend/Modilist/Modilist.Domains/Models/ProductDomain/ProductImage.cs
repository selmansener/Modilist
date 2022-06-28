
using Modilist.Domains.Base;
using Modilist.Domains.Models.CommonEntities;

namespace Modilist.Domains.Models.ProductDomain
{
    public class ProductImage : Image
    {
        public ProductImage(
            int productId,
            string name,
            string contentType,
            string url,
            string? extension = null) 
            : base(name, contentType, url, extension)
        {
            ProductId = productId;
        }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }
    }
}
