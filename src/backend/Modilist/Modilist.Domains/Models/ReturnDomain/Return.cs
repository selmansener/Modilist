
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.ReturnDomain
{
    public class Return : BaseEntity
    {
        private readonly List<ReturnLineItem> _lineItems = new List<ReturnLineItem>();

        public Return(Guid accountId, int salesOrderId, DateTime requestedPickupDate)
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            RequestedPickupDate = requestedPickupDate;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public int SalesOrderId { get; private set; }

        public int? ReturnAddressId { get; private set; }

        public ReturnAddress? ReturnAddress { get; private set; }

        public DateTime RequestedPickupDate { get; private set; }

        public IReadOnlyList<ReturnLineItem> LineItems => _lineItems;

        public ReturnState State { get; private set; }

        public string? CargoState { get; private set; }

        public string? CargoTrackingCode { get; private set; }

        public DateTime? PickedAt { get; private set; }

        public DateTime? DeliveredAt { get; private set; }

        public DateTime? ReviewedAt { get; private set; }

        public DateTime? CompletedAt { get; private set; }

        public void AssignAddress(Address address)
        {
            if (address == null)
            {
                throw new ArgumentNullException(nameof(address));
            }

            ReturnAddress = new ReturnAddress(
                Id,
                address.Name,
                address.FirstName,
                address.LastName,
                address.Phone,
                address.City,
                address.District,
                address.FullAddress,
                address.ZipCode);
        }
    }
}
