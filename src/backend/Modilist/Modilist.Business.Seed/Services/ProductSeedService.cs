
using Bogus;

using Modilist.Data.DataAccess;
using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Business.Seed.Services
{
    internal class ProductSeedService : BaseSeedService
    {
        public ProductSeedService(ModilistDbContext dbContext)
            : base(dbContext)
        {
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var faker = new Faker(locale: "tr");
            var sizes = new List<string>
            {
                "3XS","2XS","XS","S","M","L","2XL","3XL"
            };

            var baseUrl = "https://stmodilistsharedwesteu.blob.core.windows.net/img/common/product-images";

            var categories = new List<string>
            {
                "tshirt",
                "hat",
                "jean",
                "footwear",
                "sweatshirt"
            };

            for (int i = 0; i < 5; i++)
            {
                var category = categories[i];

                var product = new Product(
                    faker.Random.ReplaceNumbers("###-###-###"),
                    faker.Commerce.ProductName(),
                    faker.Commerce.Categories(1).FirstOrDefault(),
                    faker.Commerce.Categories(1).FirstOrDefault(),
                    faker.Random.Decimal(min: 150, max: 500),
                    18,
                    5,
                    faker.PickRandom(sizes),
                    "Nike",
                    Infrastructure.Shared.Interfaces.Enums.Gender.Female);

                product.AddImage(category, "image/jpeg", $"{baseUrl}/{category}.jpg");

                await _dbContext.AddAsync(product, cancellationToken);
            }
        }
    }
}
