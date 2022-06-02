
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

            for (int i = 0; i < 5; i++)
            {
                await _dbContext.AddAsync(new Product(faker.Random.ReplaceNumbers("###-###-###"), faker.Commerce.ProductName()), cancellationToken);
            }
        }
    }
}
