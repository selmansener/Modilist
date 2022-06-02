using System.Collections.Immutable;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.Seed.Services
{
    internal class StylePreferencesSeedService : BaseSeedService
    {
        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public StylePreferencesSeedService(ModilistDbContext dbContext)
            : base(dbContext)
        {
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var accounts = await _dbContext.Accounts.ToListAsync();

            foreach (var account in accounts)
            {
                var stylePreference = new StylePreference(account.Id);

                await _dbContext.AddAsync(stylePreference, cancellationToken);
            }
        }
    }
}
