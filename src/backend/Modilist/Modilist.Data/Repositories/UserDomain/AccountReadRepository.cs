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
    public interface IAccountReadRepository : IReadRepository<Account> { }

    internal class AccountReadRepository : ReadRepository<Account>, IAccountReadRepository
    {
        public AccountReadRepository(ModilistReadDbContext baseDb)
            : base(baseDb)
        {
        }
    }
}
