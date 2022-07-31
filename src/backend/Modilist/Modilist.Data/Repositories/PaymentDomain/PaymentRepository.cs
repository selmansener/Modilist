
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Data.Repositories.PaymentDomain
{
    public interface IPaymentRepository : IBaseRepository<Payment>
    {
        Task<Payment?> GetBySalesOrderAsync(Guid accountId, int salesOrderId, CancellationToken cancellationToken);
    }

    internal class PaymentRepository : BaseRepository<Payment>, IPaymentRepository
    {
        public PaymentRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Payment?> GetBySalesOrderAsync(Guid accountId, int salesOrderId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId && x.SalesOrderId == salesOrderId, cancellationToken);
        }
    }
}
