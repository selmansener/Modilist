using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Data.Repositories.SalesOrderDomain
{
    public interface ISalesOrderRepository : IBaseRepository<SalesOrder>
    {
        Task<bool> DoesSalesOrderInDateTimeRangeAsync(Guid accountId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken);

        Task<SalesOrder?> GetSalesOrderAsync(Guid accountId, int id, CancellationToken cancellationToken, bool includeLineItems = false);

        IQueryable<SalesOrder> QueryAllByAccountId(Guid accountId);
    }

    internal class SalesOrderRepository : BaseRepository<SalesOrder>, ISalesOrderRepository
    {
        public SalesOrderRepository(ModilistDbContext baseDb) 
            : base(baseDb)
        {
        }

        public Task<bool> DoesSalesOrderInDateTimeRangeAsync(Guid accountId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken)
        {
            return GetAll().AnyAsync(x => x.AccountId == accountId 
                && x.CreatedAt.DayOfYear >= startDate.DayOfYear 
                && x.CreatedAt.DayOfYear <= endDate.DayOfYear);
        }

        public Task<SalesOrder?> GetSalesOrderAsync(Guid accountId, int id, CancellationToken cancellationToken, bool includeLineItems = false)
        {
            var salesOrders = GetAll();

            if (includeLineItems)
            {
                salesOrders = salesOrders.Include(x => x.LineItems);
            }

            return salesOrders.FirstOrDefaultAsync(x => x.AccountId == accountId && x.Id == id, cancellationToken);
        }

        public IQueryable<SalesOrder> QueryAllByAccountId(Guid accountId)
        {
            return GetAll().Where(x => x.AccountId == accountId);
        }
    }
}
