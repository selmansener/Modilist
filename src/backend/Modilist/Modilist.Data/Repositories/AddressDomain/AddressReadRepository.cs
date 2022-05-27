
using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.AddressDomain.Models;

namespace Modilist.Data.Repositories.AddressDomain
{
    public interface IAddressReadRepository : IReadRepository<Address>
    {
        Task<Address> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken);

        Task<Address> GetByAccountIdAsync(int id, Guid accountId, CancellationToken cancellationToken);
    }

    internal class AddressReadRepository : ReadRepository<Address>, IAddressReadRepository
    {
        public AddressReadRepository(ModilistDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Address> GetByAccountIdAsync(int id, Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Id == id && x.AccountId == accountId, cancellationToken);
        }

        public async Task<Address> GetDefaultByAccountIdAsync(Guid accountId, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.IsDefault && x.AccountId == accountId, cancellationToken);
        }
    }
}
