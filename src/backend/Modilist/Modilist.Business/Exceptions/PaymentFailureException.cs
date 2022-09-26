namespace Modilist.Business.Exceptions
{
    internal class PaymentFailureException : Exception
    {
        public PaymentFailureException(Guid accountId, int salesOrderId, string iyzicoPaymentStatus, string iyzicoErrorCode, string iyzicoErrorGroup, string iyzicoErrorMessage)
            : base($"Iyzico payment failed for sales order: {salesOrderId}. AdditionalInfo: AccountId: {accountId}, Status: {iyzicoPaymentStatus}, ErrorCode: {iyzicoErrorCode}, ErrorGroup: {iyzicoErrorGroup}, ErrorMessage: {iyzicoErrorMessage}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            IyzicoPaymentStatus = iyzicoPaymentStatus;
            IyzicoErrorCode = iyzicoErrorCode;
            IyzicoErrorGroup = iyzicoErrorGroup;
            IyzicoErrorMessage = iyzicoErrorMessage;
        }

        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }

        public string IyzicoPaymentStatus { get; set; }

        public string IyzicoErrorCode { get; set; }

        public string IyzicoErrorGroup { get; set; }

        public string IyzicoErrorMessage { get; set; }
    }
}
