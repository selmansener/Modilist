using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Data.Repositories.SalesOrderDomain
{
    public interface ISalesOrderRepository : IBaseRepository<SalesOrder>
    {
        Task<bool> DoesSalesOrderInDateTimeRangeAsync(Guid accountId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken);

        Task<SalesOrder?> GetSalesOrderAsync(Guid accountId, int id, CancellationToken cancellationToken, bool includeLineItems = false);

        Task<SalesOrder?> GetWithAddressAsync(Guid accountId, int id, CancellationToken cancellationToken);

        IQueryable<SalesOrder> QueryAllByAccountId(Guid accountId);

        Task<SalesOrder?> GetLatestActiveOrderAsync(Guid accountId, CancellationToken cancellationToken);

        Task<SalesOrder?> GetLatestCompletedOrderAsync(Guid accountId, CancellationToken cancellationToken);

        Task<bool> DoesAccountHasAnyOrder(Guid accountId, CancellationToken cancellationToken);

    }

    internal class SalesOrderRepository : BaseRepository<SalesOrder>, ISalesOrderRepository
    {
        public SalesOrderRepository(ModilistDbContext baseDb) 
            : base(baseDb)
        {
        }

        public async Task<bool> DoesAccountHasAnyOrder(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().AnyAsync(x => x.AccountId == accountId, cancellationToken);
        }

        public async Task<bool> DoesSalesOrderInDateTimeRangeAsync(Guid accountId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken)
        {
            return await GetAll().AnyAsync(x => x.AccountId == accountId 
                && x.CreatedAt.DayOfYear >= startDate.DayOfYear 
                && x.CreatedAt.DayOfYear <= endDate.DayOfYear);
        }

        public async Task<SalesOrder?> GetLatestActiveOrderAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll()
                .Include(x => x.SalesOrderAddress)
                .OrderByDescending(x => x.CreatedAt)
                .FirstOrDefaultAsync(x => x.AccountId == accountId && x.State == SalesOrderState.Created || x.State == SalesOrderState.Prepared || x.State == SalesOrderState.Shipped, cancellationToken);
        }

        public async Task<SalesOrder?> GetSalesOrderAsync(Guid accountId, int id, CancellationToken cancellationToken, bool includeLineItems = false)
        {
            var salesOrders = GetAll();

            if (includeLineItems)
            {
                salesOrders = salesOrders.Include(x => x.LineItems);
            }

            return await salesOrders.FirstOrDefaultAsync(x => x.AccountId == accountId && x.Id == id, cancellationToken);
        }

        public async Task<SalesOrder?> GetWithAddressAsync(Guid accountId, int id, CancellationToken cancellationToken)
        {
            return await GetAll().Include(x => x.SalesOrderAddress).FirstOrDefaultAsync(x => x.AccountId == accountId && x.Id == id, cancellationToken);
        }

        public IQueryable<SalesOrder> QueryAllByAccountId(Guid accountId)
        {
            return GetAll().Where(x => x.AccountId == accountId);
        }
        public async Task<SalesOrder?> GetLatestCompletedOrderAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll()
                .Include(x => x.SalesOrderAddress)
                .OrderByDescending(x => x.CreatedAt)
                .FirstOrDefaultAsync(x => x.AccountId == accountId && x.State == SalesOrderState.Completed, cancellationToken);
        }
    }
}
