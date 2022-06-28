
using Mapster;

using Modilist.Domains.Base;
using Modilist.Domains.Exceptions;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.AddressDomain;
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

        public int? SalesOrderAddressId { get; set; }

        public SalesOrderAddress? SalesOrderAddress { get; set; }

        public SalesOrderLineItem AddLineItem(int productId)
        {
            if (_lineItems.Any(x => x.ProductId == productId))
            {
                throw new DuplicateSalesOrderLineItemException(AccountId, Id, productId);
            }

            var salesOrderLineItem = new SalesOrderLineItem(Id, productId);

            _lineItems.Add(salesOrderLineItem);

            return salesOrderLineItem;
        }

        public void AssignAddress(Address address)
        {
            if (address == null)
            {
                throw new ArgumentNullException(nameof(address));
            }

            if (SalesOrderAddress == null)
            {
                SalesOrderAddress = new SalesOrderAddress(
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
            else
            {
                SalesOrderAddress.UpdateAddress(
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
}
