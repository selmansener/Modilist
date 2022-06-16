
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.Repositories.StylePreferencesDomain
{
    public interface IFitPreferencesRepository : IBaseRepository<FitPreferences>
    {
        Task<FitPreferences?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class FitPreferencesRepository : BaseRepository<FitPreferences>, IFitPreferencesRepository
    {
        public FitPreferencesRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<FitPreferences?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
