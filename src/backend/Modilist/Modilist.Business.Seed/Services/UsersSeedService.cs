
using Bogus;

using Iyzipay.Model;
using Iyzipay.Request;

using Microsoft.Extensions.Options;

using Modilist.Business.Seed.Data;
using Modilist.Business.Utils.AddressDomain;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.PaymentDomain;
using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.Business.Seed.Services
{
    internal class UsersSeedService : BaseSeedService
    {
        private readonly SeedData _seedData;
        private readonly IAddressService _addressService;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public UsersSeedService(ModilistDbContext dbContext, SeedData seedData, IAddressService addressService, IOptions<IyzicoAPIOptions> options)
            : base(dbContext)
        {
            _seedData = seedData;
            _addressService = addressService;
            _iyzicoAPIOptions = options.Value;
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var creditCards = new List<string>
            {
                "5526080000000006",
                "4603450000000000",
                "5311570000000005",
                "5528790000000008",
                "5504720000000003",
                "4543590000000006",
                "4157920000000002"
            };

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

                var address = new Domains.Models.AddressDomain.Address(
                    account.Id,
                    faker.PickRandom(addressNames),
                    account.FirstName,
                    account.LastName,
                    account.Phone,
                    randomCity.Name,
                    randomDistrict.Name,
                    $"{faker.Address.StreetName()} {faker.Address.StreetAddress()} {randomDistrict.Name}/{randomCity.Name}",
                    isDefault: true);

                await _dbContext.AddAsync(address, cancellationToken);

                var paymentMethod = new PaymentMethod(account.Id, true);

                CreateCardRequest cardRequest = new CreateCardRequest
                {
                    Locale = Locale.TR.ToString(),
                    ConversationId = Guid.NewGuid().ToString(),
                    Email = account.Email,
                    ExternalId = paymentMethod.Id.ToString(),
                };

                var expireMonth = faker.Random.Int(min: 1, max: 12).ToString();
                expireMonth = expireMonth.Length == 1 ? expireMonth.PadLeft(0) : expireMonth;

                CardInformation cardInformation = new CardInformation
                {
                    CardAlias = account.Email,
                    CardHolderName = $"{account.FirstName} {account.LastName}",
                    CardNumber = faker.PickRandom(creditCards),
                    ExpireMonth = expireMonth,
                    ExpireYear = faker.Random.Int(min: DateTime.UtcNow.AddYears(1).Year, max: DateTime.UtcNow.AddYears(5).Year).ToString()
                };

                cardRequest.Card = cardInformation;

                Card card = Card.Create(cardRequest, new Iyzipay.Options
                {
                    ApiKey = _iyzicoAPIOptions.APIKey,
                    BaseUrl = _iyzicoAPIOptions.BaseUrl,
                    SecretKey = _iyzicoAPIOptions.SecretKey
                });

                var lastFourDigit = cardInformation.CardNumber.Substring(cardInformation.CardNumber.Length - 4, 4);

                paymentMethod.UpdateCardInfo(
                    card.CardUserKey,
                    card.CardToken,
                    card.CardAssociation,
                    card.CardFamily,
                    card.CardBankName,
                    card.CardBankCode,
                    lastFourDigit,
                    faker.Random.Int(min: 100, max: 999).ToString());

                await _dbContext.PaymentMethods.AddAsync(paymentMethod, cancellationToken);
            }
        }
    }
}
