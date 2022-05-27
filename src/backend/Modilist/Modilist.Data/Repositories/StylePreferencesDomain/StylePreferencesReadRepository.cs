using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.StylePreferences.Models;

namespace Modilist.Data.Repositories.StylePreferencesDomain
{
    public interface IStylePreferencesReadRepository : IReadRepository<StylePreference> 
    {
        Task<StylePreference> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class StylePreferencesReadRepository : ReadRepository<StylePreference>, IStylePreferencesReadRepository
    {
        public StylePreferencesReadRepository(ModilistDbContext baseDb) 
            : base(baseDb)
        {
        }

        public async Task<StylePreference> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
