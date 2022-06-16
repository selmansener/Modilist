
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.Repositories.StylePreferencesDomain
{
    public interface IPreferedFabricPropertiesRepository : IBaseRepository<PreferedFabricProperties>
    {
        Task<PreferedFabricProperties?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class PreferedFabricPropertiesRepository : BaseRepository<PreferedFabricProperties>, IPreferedFabricPropertiesRepository
    {
        public PreferedFabricPropertiesRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<PreferedFabricProperties?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
