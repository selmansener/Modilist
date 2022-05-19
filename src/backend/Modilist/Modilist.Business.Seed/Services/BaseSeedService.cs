using System.Collections.Immutable;

using Modilist.Business.Seed.Configuration;
using Modilist.Data.DataAccess;

namespace Modilist.Business.Seed.Services
{
    internal interface ISeedService
    {
        Task Execute(CancellationToken cancellationToken);

        ImmutableList<SeedServiceType> GetDependencies();
    }

    internal abstract class BaseSeedService : ISeedService
    {
        protected readonly ModilistWriteDbContext _dbContext;

        protected BaseSeedService(ModilistWriteDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected virtual ImmutableList<SeedServiceType> Dependencies { get; } = ImmutableList<SeedServiceType>.Empty;

        public abstract Task Execute(CancellationToken cancellationToken);

        public ImmutableList<SeedServiceType> GetDependencies()
        {
            return Dependencies;
        }
    }
}
