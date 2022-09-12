
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.DiscountsDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Data.Repositories.DiscountsDomain
{

    public interface IDiscountsRepository : IBaseRepository<Discount>
    {
        Task<bool> DoesNewMemberDiscountExists(Guid accountId, CancellationToken cancellationToken);

        Task<Discount?> GetByInvitationEmail(string invitationEmail, CancellationToken cancellationToken);
    }
    internal class DiscountsRepository : BaseRepository<Discount>, IDiscountsRepository
    {
        public DiscountsRepository(ModilistDbContext baseDb) : base(baseDb)
        {

        }

        public Task<bool> DoesNewMemberDiscountExists(Guid accountId, CancellationToken cancellationToken)
        {
            return _baseDb.ExclusiveDiscounts.AnyAsync(x => x.AccountId == accountId && x.Type == DiscountType.NewMemberDiscount, cancellationToken);
        }

        public async Task<Discount?> GetByInvitationEmail(string invitationEmail, CancellationToken cancellationToken)
        {
            return await _baseDb.ExclusiveDiscounts.FirstOrDefaultAsync(x => x.InvitedAccountEmail == invitationEmail && x.State == DiscountState.Created, cancellationToken);
        }
    }
}
