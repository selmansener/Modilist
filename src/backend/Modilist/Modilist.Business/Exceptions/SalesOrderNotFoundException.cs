using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    public class SalesOrderNotFoundException : Exception, IClientException
    {
        public SalesOrderNotFoundException(Guid accountId, int salesOrderId)
            : base($"SalesOrder not found with Id: {salesOrderId} for account: {accountId}")
        {
            SalesOrderId = salesOrderId;
            AccountId = accountId;
        }

        public int SalesOrderId { get; set; }

        public Guid AccountId { get; set; }

        public int StatusCode => 404;
    }
}
