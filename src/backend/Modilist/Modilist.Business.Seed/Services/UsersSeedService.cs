
using Bogus;

using Modilist.Business.Seed.Data;
using Modilist.Business.Utils.AddressDomain;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Business.Seed.Services
{
    internal class UsersSeedService : BaseSeedService
    {
        private readonly SeedData _seedData;
        private readonly IAddressService _addressService;

        public UsersSeedService(ModilistDbContext dbContext, SeedData seedData, IAddressService addressService)
            : base(dbContext)
        {
            _seedData = seedData;
            _addressService = addressService;
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var faker = new Faker();
            var cities = _addressService.GetCities();
            var addressNames = new List<string>
            {
                "Ev",
                "İş",
                "Ofis",
                "Annemler"
            };

            foreach (var user in _seedData.Users)
            {
                var account = new Account(
                    user.Id,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.BirthDate,
                    user.Gender,
                    user.InstagramUserName,
                    user.Phone,
                    user.JobTitle);

                account.Activate();

                await _dbContext.AddAsync(account, cancellationToken);

                var randomCity = faker.PickRandom(cities);
                var districts = _addressService.GetDistricts(randomCity.Code);

                var randomDistrict = faker.PickRandom(districts);

                var address = new Address(account.Id, faker.PickRandom(addressNames), account.FirstName, account.LastName, account.Phone, randomCity.Name, randomDistrict.Name, $"{faker.Address.StreetName()} {faker.Address.StreetAddress()} {randomDistrict.Name}/{randomCity.Name}", isDefault: true);

                await _dbContext.AddAsync(address, cancellationToken);
            }
        }
    }
}
