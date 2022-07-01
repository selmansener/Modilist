
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class ShipSalesOrderDTO
    {
        public int Id { get; set; }

        public SalesOrderState State { get; set; }

        public DateTime ShippedAt { get; set; }

        public string? CargoState { get; set; }

        public string? CargoTrackingCode { get; set; }
    }
}
