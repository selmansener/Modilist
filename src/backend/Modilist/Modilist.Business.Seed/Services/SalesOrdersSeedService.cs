using System.Collections.Immutable;

using Bogus;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Business.Seed.Utils;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

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

                    salesOrder.AssignAddress(defaultAddress);

                    if (i > 0)
                    {
                        // TODO: this will be used later
                        //var randomProducts = faker.PickRandom(products, 5).ToList();

                        for (int j = 0; j < 5; j++)
                        {
                            var product = products[j];

                            salesOrder.AddLineItem(product.Id, product.Price, product.SalesPrice);
                        }

                        salesOrder.Prepared();
                        salesOrder.Shipped("Yolda", faker.Random.Replace("##-######"));
                        salesOrder.Delivered();
                    }

                    salesOrders.Add(salesOrder);
                }
            }

            await _dbContext.AddRangeAsync(salesOrders, cancellationToken);

            _dbContext.ChangeTracker.DetectChanges();

            await _dbContext.SaveChangesAsync();

            foreach (var account in accounts)
            {
                var orders = salesOrders.Where(x => x.State == SalesOrderState.Delivered && x.AccountId == account.Id);

                foreach (var salesOrder in orders.Take(orders.Count() - 5))
                {
                    foreach (var lineItem in salesOrder.LineItems)
                    {
                        var price = faker.Random.Double(1, 5);
                        price = Math.Round(price * 2, MidpointRounding.ToEven) / 2;
                        var style = faker.Random.Double(1, 5);
                        style = Math.Round(style * 2, MidpointRounding.AwayFromZero) / 2;
                        var fit = faker.Random.Double(1, 5);
                        fit = Math.Round(fit * 2, MidpointRounding.ToEven) / 2;
                        var quality = faker.Random.Double(1, 5);
                        quality = Math.Round(quality * 2, MidpointRounding.ToEven) / 2;
                        var fabric = faker.Random.Double(1, 5);
                        fabric = Math.Round(fabric * 2, MidpointRounding.ToEven) / 2;
                        var pattern = faker.Random.Double(1, 5);
                        pattern = Math.Round(pattern * 2, MidpointRounding.ToEven) / 2;
                        var perfectMatch = faker.Random.Double(1, 5);
                        perfectMatch = Math.Round(perfectMatch * 2, MidpointRounding.ToEven) / 2;
                        var color = faker.Random.Double(1, 5);
                        color = Math.Round(color * 2, MidpointRounding.ToEven) / 2;
                        var brand = faker.Random.Double(1, 5);
                        brand = Math.Round(color * 2, MidpointRounding.ToEven) / 2;
                        var values = new List<double> { price, style, fit, quality, fabric, pattern, perfectMatch, color, brand };
                        var average = Math.Round(values.Average() * 2, MidpointRounding.AwayFromZero) / 2;

                        var soldOrReturned = SalesOrderLineItemState.Returned;
                        if (average > 2.5)
                        {
                            soldOrReturned = SalesOrderLineItemState.Sold;
                        }

                        salesOrder.AddOrUpdateFeedback(
                            lineItem.Id,
                            soldOrReturned,
                            (float)price,
                            faker.PickRandomWithout(LineItemSizeFeedback.None),
                            (float)style,
                            (float)fit,
                            (float)color,
                            (float)quality,
                            (float)fabric,
                            (float)pattern,
                            (float)perfectMatch,
                            (float)brand,
                            faker.Random.Bool());
                    }

                    salesOrder.Completed();
                }
            }

        }
    }
}
