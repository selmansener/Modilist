
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.ReturnDomain;

namespace Modilist.Data.Repositories.ReturnDomain
{
    public interface IReturnRepository : IBaseRepository<Return> 
    { 
        Task<Return?> GetBySalesOrderAsync(Guid accountId, int salesOrderId, CancellationToken cancellationToken);
    }

    internal class ReturnRepository : BaseRepository<Return>, IReturnRepository
    {
        public ReturnRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Return?> GetBySalesOrderAsync(Guid accountId, int salesOrderId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId && x.SalesOrderId == salesOrderId, cancellationToken);
        }
    }
}
