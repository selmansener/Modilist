using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Infrastructure.Shared.Enums
{
    public enum SalesOrderState
    {
        None = 0,
        Created = 1,
        Preparing = 2,
        Prepared = 3,
        Shipped = 4,
        Delivered = 5,
        Completed = 6
    }
}
