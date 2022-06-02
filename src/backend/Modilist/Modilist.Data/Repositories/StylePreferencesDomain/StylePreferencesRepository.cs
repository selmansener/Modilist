
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.Repositories.StylePreferencesDomain
{
    public interface IStylePreferencesRepository : IBaseRepository<StylePreference>
    {
        Task<StylePreference?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class StylePreferencesRepository : BaseRepository<StylePreference>, IStylePreferencesRepository
    {
        public StylePreferencesRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<StylePreference?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
