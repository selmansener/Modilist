﻿
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class ActiveSalesOrderDTO
    {
        public int Id { get; set; }

        public Guid AccountId { get; private set; }

        public SalesOrderState State { get; private set; }

        public string? CargoState { get; private set; }

        public string? CargoTrackingCode { get; private set; }

        public DateTime? ShippedAt { get; private set; }

        public DateTime? DeliveredAt { get; private set; }

        public DateTime? CompletedAt { get; private set; }

        public DateTime CreatedAt { get; set; }

        public SalesOrderAddressDTO SalesOrderAddress { get; set; }
    }
}