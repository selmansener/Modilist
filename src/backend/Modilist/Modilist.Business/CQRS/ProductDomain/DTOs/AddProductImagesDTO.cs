
using Mapster;

using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Business.CQRS.ProductDomain.DTOs
{
    public class AddProductImagesDTO
    {
        public int ProductId { get; set; }

        public IEnumerable<ProductImageDTO> ProductImages { get; set; }
    }

    public class ImageVariantDTO
    {
        public string? Thumbnail { get; set; }

        public string? XSmall { get; set; }

        public string? Small { get; set; }

        public string? Medium { get; set; }

        public string? Large { get; set; }

        public string? XLarge { get; set; }
    }

    public class AddProductImagesDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Product, AddProductImagesDTO>()
                .Map(dest => dest.ProductId, src => src.Id)
                .Map(dest => dest.ProductImages, src => src.Images.Select(image => new ProductImageDTO
                {
                    Name = image.Name,
                    ContentType = image.ContentType,
                    Extension = image.Extension,
                    Url = image.Url,
                    Variants = new ImageVariantDTO
                    {
                        Thumbnail = image.Variants.Thumbnail,
                        XSmall = image.Variants.XSmall,
                        Small = image.Variants.Small,
                        Medium = image.Variants.Medium,
                        Large = image.Variants.Large,
                        XLarge = image.Variants.XLarge,
                    }
                }));
        }
    }
}
