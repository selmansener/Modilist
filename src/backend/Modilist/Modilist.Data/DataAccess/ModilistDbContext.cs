
using Microsoft.EntityFrameworkCore;

namespace Modilist.Data.DataAccess
{
    internal class ModilistReadDbContext : ModilistBaseDbContext
    {
        public ModilistReadDbContext(DbContextOptions<ModilistReadDbContext> options)
            : base(options)
        {
        }
    }

    internal class ModilistWriteDbContext : ModilistBaseDbContext
    {
        public ModilistWriteDbContext(DbContextOptions<ModilistWriteDbContext> options)
            : base(options)
        {
        }
    }
}
