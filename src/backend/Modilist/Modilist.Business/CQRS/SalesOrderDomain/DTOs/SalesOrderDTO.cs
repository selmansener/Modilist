using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class SalesOrderDTO
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

    public class SalesOrderAddressDTO
    {
        public string Name { get; private set; }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Phone { get; private set; }

        public string? ZipCode { get; private set; }

        public string City { get; private set; }

        public string District { get; private set; }

        public string FullAddress { get; private set; }
    }
}
