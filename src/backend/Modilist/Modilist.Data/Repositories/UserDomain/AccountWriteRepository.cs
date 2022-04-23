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
    public interface IAccountWriteRepository : IWriteRepository<Account> 
    {
        Task<Account> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }

    internal class AccountWriteRepository : WriteRepository<Account>, IAccountWriteRepository
    {
        public AccountWriteRepository(ModilistWriteDbContext baseDb) 
            : base(baseDb)
        {
        }

        public async Task<Account> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
           return await _baseDb.Accounts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }
    }
}
