using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class LatestSalesOrderDTO
    {
        public int Id { get; set; }

        public Guid AccountId { get; set; }

        public SalesOrderState State { get; set; }

        public string? CargoState { get; set; }

        public string? CargoTrackingCode { get; set; }

        public DateTime? ShippedAt { get; set; }

        public DateTime? DeliveredAt { get; set; }

        public DateTime? CompletedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public string AdditionalRequests { get; set; }

        public string RequestedStyle { get; set; }
    }
}
