using System.Collections.Immutable;

using Azure.Core;

using Bogus;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Business.Seed.Utils;
using Modilist.Business.Utils.AddressDomain;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Models.SubscriptionDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.Seed.Services
{
    internal class SalesOrdersSeedService : BaseSeedService
    {
        private readonly IAddressService _addressService;
        public SalesOrdersSeedService(ModilistDbContext dbContext, IAddressService addressService)
            : base(dbContext)
        {
            _addressService = addressService;
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users, SeedServiceType.Product);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var faker = new Faker("tr");
            var accounts = await _dbContext.Accounts.ToListAsync(cancellationToken);
            var products = await _dbContext.Products.ToListAsync(cancellationToken);

            var salesOrders = new List<SalesOrder>();

            foreach (var account in accounts)
            {
                var defaultAddress = await _dbContext.Addresses.FirstOrDefaultAsync(x => x.AccountId == account.Id && x.IsDefault, cancellationToken);

                Subscription? subscription = await _dbContext.Subscriptions.FirstOrDefaultAsync(x => x.AccountId == account.Id, cancellationToken);

                for (int i = 15; i >= 0; i--)
                {
                    var salesOrder = new SalesOrder(account.Id, subscription.MaxPricingLimit);

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

            await _dbContext.SaveChangesAsync(cancellationToken);

            var cities = _addressService.GetCities();

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



                    var randomCity = faker.PickRandom(cities);
                    var districts = _addressService.GetDistricts(randomCity.Code);

                    var randomDistrict = faker.PickRandom(districts);

                    var billingType = faker.PickRandomWithout<BillingType>(BillingType.None);

                    var billingAddress = new BillingAddress(
                        salesOrder.Id,
                        "ev",
                        randomCity.Name,
                        randomDistrict.Name,
                        $"{faker.Address.StreetName()} {faker.Address.StreetAddress()} {randomDistrict.Name}/{randomCity.Name}",
                        account.Email,
                        account.Phone,
                        billingType,
                        billingType == BillingType.Individual ? $"{account.FirstName} {account.LastName}" : null,
                        faker.Address.ZipCode(),
                        billingType == BillingType.Individual ? faker.Random.ReplaceNumbers("###########") : null,
                        billingType == BillingType.Organization ? faker.Company.CompanyName() : null,
                        billingType == BillingType.Organization ? faker.Random.ReplaceNumbers("##########") : null,
                        billingType == BillingType.Organization ? faker.Company.CompanyName() : null);

                    salesOrder.Completed(billingAddress);
                }
            }

        }
    }
}
