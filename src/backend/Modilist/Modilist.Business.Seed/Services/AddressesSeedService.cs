using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Bogus;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Business.Utils.AddressDomain;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Business.Seed.Services
{
    internal class AddressesSeedService : BaseSeedService
    {
        private readonly IAddressService _addressService;

        public AddressesSeedService(ModilistDbContext dbContext, IAddressService addressService)
            : base(dbContext)
        {
            _addressService = addressService;
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var accounts = await _dbContext.Accounts.ToListAsync(cancellationToken);

            var addressNames = new List<string>
            {
                "Ev",
                "İş",
                "Ofis",
                "Annemler",
                "Çarşamba Pazarı",
                "Eski Mahalle",
                "Yeni Ev",
                "Ara Sokak"
            };

            var cities = _addressService.GetCities();

            var addresses = new List<Address>();
            foreach (var account in accounts)
            {
                var defaultAddress = await _dbContext.Addresses.FirstOrDefaultAsync(x => x.AccountId == account.Id && x.IsDefault, cancellationToken);

                var excludeList = new List<string>
                {
                    defaultAddress.Name
                };

                var faker = new Faker("tr");

                for (int i = 0; i < 4; i++)
                {
                    var randomCity = faker.PickRandom(cities);
                    var districts = _addressService.GetDistricts(randomCity.Code);

                    var randomDistrict = faker.PickRandom(districts);

                    var randomAddressName = faker.PickRandom(addressNames.Except(excludeList).ToList());
                    excludeList.Add(randomAddressName);

                    addresses.Add(new Address(
                        account.Id,
                        randomAddressName,
                        account.FirstName,
                        account.LastName,
                        account.Phone,
                        randomCity.Name,
                        randomDistrict.Name,
                        $"{faker.Address.StreetName()} {faker.Address.StreetAddress()} {randomDistrict.Name}/{randomCity.Name}",
                        isDefault: false,
                        faker.Address.ZipCode()));
                }
            }

            await _dbContext.AddRangeAsync(addresses, cancellationToken);
        }
    }
}
