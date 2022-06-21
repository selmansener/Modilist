
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.Repositories.StylePreferencesDomain
{
    public interface IStylePreferencesRepository : IBaseRepository<StylePreferences>
    {
        Task<StylePreferences?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class StylePreferencesRepository : BaseRepository<StylePreferences>, IStylePreferencesRepository
    {
        public StylePreferencesRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<StylePreferences?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
