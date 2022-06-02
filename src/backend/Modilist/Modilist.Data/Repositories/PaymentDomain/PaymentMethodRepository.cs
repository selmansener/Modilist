
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Data.Repositories.PaymentDomain
{
    public interface IPaymentMethodRepository : IBaseRepository<PaymentMethod>
    {
        Task<PaymentMethod?> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);

        Task<PaymentMethod?> GetByCardKey(Guid accountId, string cardUserKey, CancellationToken cancellationToken);
    }

    internal class PaymentMethodRepository : BaseRepository<PaymentMethod>, IPaymentMethodRepository
    {
        public PaymentMethodRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<PaymentMethod?> GetByCardKey(Guid accountId, string cardUserKey, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.AccountId == accountId && x.CardUserKey == cardUserKey, cancellationToken);
        }

        public async Task<PaymentMethod?> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.IsDefault && x.AccountId == accountId, cancellationToken);
        }
    }
}
