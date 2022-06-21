
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.SubscriptionDomain;

namespace Modilist.Data.Repositories.SubscriptionDomain
{
    public interface ISubscriptionRepository : IBaseRepository<Subscription>
    {
        Task<Subscription?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class SubscriptionRepository : BaseRepository<Subscription>, ISubscriptionRepository
    {
        public SubscriptionRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Subscription?> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId, cancellationToken);
        }
    }
}
