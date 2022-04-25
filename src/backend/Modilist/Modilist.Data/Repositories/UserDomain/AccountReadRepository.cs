using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Data.Repositories.UserDomain
{
    public interface IAccountReadRepository : IReadRepository<Account>
    {
        Task<Account> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }

    internal class AccountReadRepository : ReadRepository<Account>, IAccountReadRepository
    {
        public AccountReadRepository(ModilistReadDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Account> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _baseDb.Accounts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }
    }
}
