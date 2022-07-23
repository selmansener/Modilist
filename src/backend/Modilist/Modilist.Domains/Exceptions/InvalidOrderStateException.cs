
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class InvalidOrderStateException : Exception, IClientException
    {
        public InvalidOrderStateException(Guid accountId, int salesOrderId, SalesOrderState currentState, SalesOrderState requiredState, string actionName)
            : base($"Invalid order state to perform {actionName}. Additional info: AccountId: {accountId}, SalesOrderId: {salesOrderId}, CurrentState: {currentState}, RequiredState: {requiredState}")
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
            CurrentState = currentState;
            RequiredState = requiredState;
        }

        public Guid AccountId { get; private set; }

        public int SalesOrderId { get; private set; }

        public SalesOrderState CurrentState { get; private set; }

        public SalesOrderState RequiredState { get; private set; }

        public int StatusCode => 400;
    }
}
