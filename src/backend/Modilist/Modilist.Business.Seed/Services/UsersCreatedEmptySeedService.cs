
using Modilist.Business.Seed.Data;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Business.Seed.Services
{
    internal class UsersCreatedEmptySeedService : BaseSeedService
    {
        private readonly SeedData _seedData;

        public UsersCreatedEmptySeedService(ModilistDbContext dbContext, SeedData seedData)
            : base(dbContext)
        {
            _seedData = seedData;
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {
            foreach (var user in _seedData.Users)
            {
                var account = new Account(
                    user.Id,
                    user.Email);

                await _dbContext.AddAsync(account, cancellationToken);
            }
        }
    }
}
