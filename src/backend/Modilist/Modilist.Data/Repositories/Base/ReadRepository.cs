using System.Data;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Domains.Base;


namespace Modilist.Data.Repositories.Base
{
    public interface IReadRepository<TEntity> where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken);
    }

    internal abstract class ReadRepository<TEntity> : IReadRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly ModilistReadDbContext _baseDb;

        public ReadRepository(ModilistReadDbContext baseDb)
        {
            _baseDb = baseDb;

            var dbInstance = _baseDb.Database;
            if (dbInstance.CurrentTransaction == null)
            {
                dbInstance.BeginTransaction(IsolationLevel.ReadCommitted);
            }
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            IQueryable<TEntity> dataSet = _baseDb.Set<TEntity>();

            return dataSet.AsNoTracking();
        }

        public virtual async Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }
    }
}
