
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.AddressDomain.Models;

namespace Modilist.Data.Repositories.AddressDomain
{
    public interface IAddressWriteRepository : IWriteRepository<Address>
    {
        Task<Address> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);

        Task<Address> GetByAccountIdAsync(int id, Guid accountId, CancellationToken cancellationToken);

        Task<Address> GetByNameAsync(string name, Guid accountId, CancellationToken cancellationToken);
    }

    internal class AddressWriteRepository : WriteRepository<Address>, IAddressWriteRepository
    {
        public AddressWriteRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Address> GetByAccountIdAsync(int id, Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Id == id && x.AccountId == accountId, cancellationToken);
        }

        public async Task<Address> GetByNameAsync(string name, Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Name == name && x.AccountId == accountId, cancellationToken);
        }

        public async Task<Address> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.IsDefault && x.AccountId == accountId, cancellationToken);
        }
    }
}
