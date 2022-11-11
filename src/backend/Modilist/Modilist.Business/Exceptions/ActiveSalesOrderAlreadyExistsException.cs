using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ActiveSalesOrderAlreadyExistsException : Exception, IClientException
    {
        public ActiveSalesOrderAlreadyExistsException(Guid accountId, int salesOrderId, SalesOrderState salesOrderState)
            : base($"Active SalesOrder with id: {salesOrderId} with state: {salesOrderState} for account: {accountId}")
        {
            AccountId = accountId; 
            SalesOrderId = salesOrderId; 
            SalesOrderState = salesOrderState; 
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public SalesOrderState SalesOrderState { get; private set; }

        public int StatusCode => 409;
    }
}
