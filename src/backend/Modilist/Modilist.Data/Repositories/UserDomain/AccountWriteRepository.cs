using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Data.Repositories.UserDomain
{
    public interface IAccountWriteRepository : IWriteRepository<Account> { }

    internal class AccountWriteRepository : WriteRepository<Account>, IAccountWriteRepository
    {
        internal AccountWriteRepository(ModilistWriteDbContext baseDb) 
            : base(baseDb)
        {
        }
    }
}
