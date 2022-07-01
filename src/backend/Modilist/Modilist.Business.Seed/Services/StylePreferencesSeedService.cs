using System.Collections.Immutable;

using Bogus;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.Seed.Services
{
    internal class StylePreferencesSeedService : BaseSeedService
    {
        public StylePreferencesSeedService(ModilistDbContext dbContext)
            : base(dbContext)
        {
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var accounts = await _dbContext.Accounts.ToListAsync();

            var faker = new Faker();

            var choiceReasons = new List<string>()
            {
                "Trendleri Takip Etmek",
                "Alışverişten Zaman Kazanmak",
                "Özel Stil Danışmanım Olması",
                "Yerel ve Butik Markaları Denemek",
                "Süprizlerle Kendimi Şımartmak",
                "Kendime Yeni Bir Stil Oluşturmak"
            };

            foreach (var account in accounts)
            {
                var stylePreference = new StylePreferences(
                    account.Id,
                    faker.PickRandom<string>(choiceReasons),
                    faker.Random.Float(),
                    faker.Random.Float(),
                    false,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty,
                    string.Empty);

                await _dbContext.AddAsync(stylePreference, cancellationToken);
            }
        }
    }
}
