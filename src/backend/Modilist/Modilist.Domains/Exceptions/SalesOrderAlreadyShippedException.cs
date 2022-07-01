
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    public class SalesOrderAlreadyShippedException : Exception, IClientException
    {
        public SalesOrderAlreadyShippedException(int salesOrderId, Guid accountId, string trackingCode)
            : base($"SalesOrder is already shipped with CargoTrackingCode: {trackingCode}. Additional Info: AccountId: {accountId}, SalesOrderId: {salesOrderId}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            CargoTrackingCode = trackingCode;
        }

        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }

        public string CargoTrackingCode { get; set; }

        public int StatusCode => 400;
    }
}
