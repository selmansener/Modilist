
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

        public DateTime? PreparedAt { get; private set; }

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

        public void Prepared()
        {
            if (State >= SalesOrderState.Prepared)
            {
                throw new SalesOrderAlreadyPreparedException(AccountId, Id);
            }

            State = SalesOrderState.Prepared;
            PreparedAt = DateTime.UtcNow;
        }

        public void Shipped(string? cargoState, string cargoTrackingCode)
        {
            if (string.IsNullOrWhiteSpace(cargoTrackingCode))
            {
                throw new ArgumentNullException(nameof(cargoTrackingCode));
            }

            if (State >= SalesOrderState.Shipped)
            {
                throw new SalesOrderAlreadyShippedException(Id, AccountId, CargoTrackingCode);
            }

            CargoState = cargoState;
            CargoTrackingCode = cargoTrackingCode;
            State = SalesOrderState.Shipped;
            ShippedAt = DateTime.UtcNow;
        }

        public void Delivered()
        {
            if (State >= SalesOrderState.Delivered)
            {
                throw new SalesOrderAlreadyDeliveredException(AccountId, Id);
            }

            State = SalesOrderState.Delivered;
            PreparedAt = DateTime.UtcNow;
        }

        public void Completed()
        {
            if (State == SalesOrderState.Completed)
            {
                throw new SalesOrderAlreadyCompletedException(AccountId, Id);
            }

            State = SalesOrderState.Completed;
            PreparedAt = DateTime.UtcNow;
        }

        public void AddOrUpdateFeedback(
            int salesOrderLineItemId,
            SalesOrderLineItemState lineItemState,
            float price,
            LineItemSizeFeedback size,
            float style,
            float fit,
            float color,
            float quality,
            float fabric,
            float pattern,
            float perfectMatch,
            float brand,
            bool sendSimilarProducts = false,
            string? additionalNotes = null)
        {
            if (State != SalesOrderState.Delivered)
            {
                throw new InvalidOrderStateFeedbackException(Id, salesOrderLineItemId, State);
            }

            if (LineItems.Count == 0)
            {
                throw new InvalidOperationException($"LineItems has to be included to perform AddFeedback action. Additional Info: SalesOrderId: {Id}, AccountId: {AccountId}");
            }

            var salesOrderLineItem = LineItems.FirstOrDefault(x => x.Id == salesOrderLineItemId);

            if (salesOrderLineItem == null)
            {
                throw new SalesOrderLineItemNotFoundException(AccountId, Id, salesOrderLineItemId);
            }

            salesOrderLineItem.AddOrUpdateFeedback(lineItemState, price, size, style, fit, color, quality, fabric, pattern, perfectMatch, brand, sendSimilarProducts, additionalNotes);
        }
    }
}
