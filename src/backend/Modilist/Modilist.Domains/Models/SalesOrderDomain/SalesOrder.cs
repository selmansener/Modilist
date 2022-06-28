using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.SalesOrderDomain
{
    public class SalesOrder : BaseEntity
    {
        private readonly List<SalesOrderLineItem> _lineItems = new List<SalesOrderLineItem>();

        public SalesOrder(Guid accountId)
        {
            AccountId = accountId;
            State = SalesOrderState.Created;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public SalesOrderState State { get; private set; }

        public string? CargoState { get; private set; }

        public string? CargoTrackingCode { get; private set; }

        public DateTime? ShippedAt { get; private set; }

        public DateTime? DeliveredAt { get; private set; }

        public DateTime? CompletedAt { get; private set; }

        public IReadOnlyList<SalesOrderLineItem> LineItems => _lineItems;
    }
}
