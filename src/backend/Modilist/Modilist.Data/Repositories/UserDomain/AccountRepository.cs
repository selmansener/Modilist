
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Data.Repositories.UserDomain
{
    public interface IAccountRepository : IBaseRepository<Account>
    {
        Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<Account?> GetByMail(string mail, CancellationToken cancellationToken);
    }

    internal class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        public AccountRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _baseDb.Accounts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<Account?> GetByMail(string mail, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(account => account.Email == mail, cancellationToken);
        }
    }
}
