namespace Modilist.Business.Exceptions
{
    internal class AccountHasActiveSalesOrderException : Exception
    {
        public AccountHasActiveSalesOrderException(Guid accountId, DateTime startDate, DateTime endDate)
            : base($"Account already has an active SalesOrder in date range: {startDate} - {endDate}. AccountId: {accountId}")
        {
            AcccountId = accountId;
            StartDate = startDate;
            EndDate = endDate;
        }

        public Guid AcccountId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
