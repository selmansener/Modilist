using System.Data;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Domains.Base;

namespace Modilist.Data.Repositories.Base
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        Task<int> AddAsync(TEntity entity, CancellationToken cancellationToken, bool saveChanges = false);
        Task<int> AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool saveChanges = false);
        void BeginTransactionAsync(CancellationToken cancellationToken);
        void Detach(TEntity entity);
        void DetachAll(IEnumerable<TEntity> entities);
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> GetAllAsNoTracking();
        Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken);
        Task<int> RemoveAsync(TEntity entity, CancellationToken cancellationToken, bool saveChanges = false);
        Task<int> RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool saveChanges = false);
        Task<int> UpdateAsync(TEntity entity, CancellationToken cancellationToken, bool saveChanges = false);
        Task<int> UpdateRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool saveChanges = false);
    }

    internal abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly ModilistDbContext _baseDb;

        public BaseRepository(ModilistDbContext baseDb)
        {
            _baseDb = baseDb;
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            IQueryable<TEntity> dataSet = _baseDb.Set<TEntity>();

            return dataSet;
        }

        public virtual async Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }

        public virtual IQueryable<TEntity> GetAllAsNoTracking()
        {
            return GetAll().AsNoTracking();
        }

        public virtual async Task<int> AddAsync(TEntity entity, CancellationToken cancellationToken, bool saveChanges = false)
        {
            int resultCount = 0;
            await _baseDb.Set<TEntity>().AddAsync(entity, cancellationToken);

            if (saveChanges)
            {
                resultCount = await _baseDb.SaveChangesAsync(cancellationToken);
            }

            return resultCount;
        }

        public virtual async Task<int> AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool saveChanges = false)
        {
            int resultCount = 0;
            await _baseDb.Set<TEntity>().AddRangeAsync(entities, cancellationToken);

            if (saveChanges)
            {
                resultCount = await _baseDb.SaveChangesAsync(cancellationToken);
            }

            return resultCount;
        }

        public virtual void Detach(TEntity entity)
        {
            _baseDb.Entry(entity).State = EntityState.Detached;
        }

        public virtual void DetachAll(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Detach(entity);
            }
        }

        public virtual async Task<int> RemoveAsync(TEntity entity, CancellationToken cancellationToken, bool saveChanges = false)
        {
            int resultCount = 0;
            _baseDb.Entry(entity).State = EntityState.Deleted;

            if (saveChanges)
            {
                resultCount = await _baseDb.SaveChangesAsync(cancellationToken);
            }

            return resultCount;
        }

        public virtual async Task<int> RemoveRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool saveChanges = false)
        {
            int resultCount = 0;
            _baseDb.Set<TEntity>().RemoveRange(entities);

            if (saveChanges)
            {
                resultCount = await _baseDb.SaveChangesAsync(cancellationToken);
            }

            return resultCount;
        }

        public virtual async Task<int> UpdateRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool saveChanges = false)
        {
            int resultCount = 0;

            foreach (var entity in entities)
            {
                entity.Update();
                _baseDb.Entry(entity).State = EntityState.Modified;
            }

            if (saveChanges)
            {
                resultCount = await _baseDb.SaveChangesAsync(cancellationToken);
            }

            return resultCount;
        }

        public virtual async Task<int> UpdateAsync(TEntity entity, CancellationToken cancellationToken, bool saveChanges = false)
        {
            int resultCount = 0;
            entity.Update();
            _baseDb.Entry(entity).State = EntityState.Modified;

            if (saveChanges)
            {
                resultCount = await _baseDb.SaveChangesAsync(cancellationToken);
            }

            return resultCount;
        }

        public void BeginTransactionAsync(CancellationToken cancellationToken)
        {
            if (_baseDb.Database.CurrentTransaction == null)
            {
                _baseDb.Database.BeginTransactionAsync(IsolationLevel.RepeatableRead, cancellationToken);
            }
        }
    }
}
