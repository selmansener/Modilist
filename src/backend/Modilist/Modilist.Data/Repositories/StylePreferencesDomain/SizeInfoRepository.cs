
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Data.Repositories.StylePreferencesDomain
{
    public interface ISizeInfoRepository : IBaseRepository<SizeInfo>
    {
        Task<SizeInfo?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class SizeInfoRepository : BaseRepository<SizeInfo>, ISizeInfoRepository
    {
        public SizeInfoRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<SizeInfo?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
