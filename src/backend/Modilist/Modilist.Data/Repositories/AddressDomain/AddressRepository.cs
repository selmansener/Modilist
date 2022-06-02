
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Data.Repositories.AddressDomain
{
    public interface IAddressRepository : IBaseRepository<Address>
    {
        Task<Address?> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);

        Task<Address?> GetByAccountIdAsync(int id, Guid accountId, CancellationToken cancellationToken);

        Task<Address?> GetByNameAsync(string name, Guid accountId, CancellationToken cancellationToken);
    }

    internal class AddressRepository : BaseRepository<Address>, IAddressRepository
    {
        public AddressRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Address?> GetByAccountIdAsync(int id, Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Id == id && x.AccountId == accountId, cancellationToken);
        }

        public async Task<Address?> GetByNameAsync(string name, Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Name == name && x.AccountId == accountId, cancellationToken);
        }

        public async Task<Address?> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.IsDefault && x.AccountId == accountId, cancellationToken);
        }
    }
}
