using System.Collections.Immutable;

using Bogus;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Business.Seed.Utils;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Business.Seed.Services
{
    internal class SalesOrdersSeedService : BaseSeedService
    {
        public SalesOrdersSeedService(ModilistDbContext dbContext)
            : base(dbContext)
        {
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users, SeedServiceType.Product);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var faker = new Faker();
            var accounts = await _dbContext.Accounts.ToListAsync(cancellationToken);
            var products = await _dbContext.Products.ToListAsync(cancellationToken);

            var salesOrders = new List<SalesOrder>();

            foreach (var account in accounts)
            {
                var defaultAddress = await _dbContext.Addresses.FirstOrDefaultAsync(x => x.AccountId == account.Id && x.IsDefault);

                for (int i = 15; i >= 0; i--)
                {
                    var salesOrder = new SalesOrder(account.Id);

                    salesOrder.SetBasePrivateProperty(nameof(SalesOrder.CreatedAt), DateTime.UtcNow.AddMonths(-i));

                    if (i > 0)
                    {
                        var randomProducts = faker.PickRandom(products, 5).ToList();

                        for (int j = 0; j < 5; j++)
                        {
                            var product = randomProducts[j];

                            salesOrder.AddLineItem(product.Id);
                        }

                        salesOrder.AssignAddress(defaultAddress);

                        salesOrder.Prepared();
                        salesOrder.Shipped("Yolda", faker.Random.Replace("##-######"));
                        salesOrder.Delivered();
                        salesOrder.Completed();
                    }

                    salesOrders.Add(salesOrder);
                }
            }

            await _dbContext.AddRangeAsync(salesOrders, cancellationToken);
        }
    }
}
