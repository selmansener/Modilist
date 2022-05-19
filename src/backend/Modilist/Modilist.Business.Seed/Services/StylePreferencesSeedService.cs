using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.Seed.Configuration;
using Modilist.Data.DataAccess;
using Modilist.Domains.StylePreferences.Models;

namespace Modilist.Business.Seed.Services
{
    internal class StylePreferencesSeedService : BaseSeedService
    {
        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public StylePreferencesSeedService(ModilistWriteDbContext dbContext) 
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
