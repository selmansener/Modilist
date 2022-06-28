using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Modilist.Data.DataAccess;
using Modilist.Data.Repositories.Base;
using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Data.Repositories.ProductDomain
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<Product?> GetBySKUAsync(string sku, CancellationToken cancellationToken);
    }

    internal class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(ModilistDbContext baseDb) 
            : base(baseDb)
        {
        }

        public async Task<Product?> GetBySKUAsync(string sku, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.SKU == sku, cancellationToken);
        }
    }
}
