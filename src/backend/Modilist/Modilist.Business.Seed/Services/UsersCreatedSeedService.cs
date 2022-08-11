
using Modilist.Business.Seed.Data;
using Modilist.Data.DataAccess;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Business.Seed.Services
{
    internal class UsersCreatedSeedService : BaseSeedService
    {
        private readonly SeedData _seedData;

        public UsersCreatedSeedService(ModilistDbContext dbContext, SeedData seedData)
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
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.BirthDate,
                    user.Gender,
                    user.InstagramUserName,
                    user.Phone,
                    user.JobTitle);

                account.Verify();

                await _dbContext.AddAsync(account, cancellationToken);
            }
        }
    }
}
