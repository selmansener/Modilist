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
    public interface IStylePreferencesWriteRepository : IWriteRepository<StylePreference> 
    { 
        Task<StylePreference> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class StylePreferencesWriteRepository : WriteRepository<StylePreference>, IStylePreferencesWriteRepository
    {
        public StylePreferencesWriteRepository(ModilistWriteDbContext baseDb) 
            : base(baseDb)
        {
        }

        public async Task<StylePreference> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
