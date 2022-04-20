using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Bogus;

using Modilist.Business.Seed.Configuration;
using Modilist.Data.DataAccess;
using Modilist.Domains.ProductDomain.Models;

namespace Modilist.Business.Seed.Services
{
    internal class PlaylistSeedService : BaseSeedService
    {
        public PlaylistSeedService(ModilistWriteDbContext dbContext)
            : base(dbContext)
        {
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.User);

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
