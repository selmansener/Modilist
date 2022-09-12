
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.DiscountsDomain;

namespace Modilist.Data.Repositories.DiscountsDomain
{
    public interface IExclusiveDiscountsRepository : IBaseRepository<ExclusiveDiscount>
    {
        Task<IEnumerable<ExclusiveDiscount>> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);
    }

    internal class ExclusiveDiscountsRepository : BaseRepository<ExclusiveDiscount>, IExclusiveDiscountsRepository
    {
        public ExclusiveDiscountsRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<IEnumerable<ExclusiveDiscount>> GetByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().Where(x => x.AccountId == accountId).ToListAsync(cancellationToken);
        }
    }
}
