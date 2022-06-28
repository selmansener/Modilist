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
        Shipped = 2,
        Delivered = 3,
        Completed = 4
    }
}
