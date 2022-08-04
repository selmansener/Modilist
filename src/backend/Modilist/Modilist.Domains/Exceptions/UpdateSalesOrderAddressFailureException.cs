
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class UpdateSalesOrderAddressFailureException : Exception, IClientException
    {
        public UpdateSalesOrderAddressFailureException(Guid accountId, int salesOrderId, int addressId, SalesOrderState state, string reason) :
            base($"Invalid update operation for sales order address with AddressId: {addressId}. Reaason: {reason}. AdditionalInfo: AccountId: {accountId}, SalesOrderId: {salesOrderId}, SalesOrderState: {state}.")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            AddressId = addressId;
            Reason = reason;
            State = state;
        }

        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }

        public int AddressId { get; set; }

        public SalesOrderState State { get; set; }

        public string Reason { get; set; }

        public int StatusCode => 400;
    }
}
