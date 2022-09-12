
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.Exceptions
{
    internal class GrantInvitationFailureException : Exception
    {
        public GrantInvitationFailureException(Guid invitedAccountId, AccountState currentAccountState)
            : base($"Invited account must be in Active state to grant exclusive discount. AdditionalInfo: AccountId: {invitedAccountId}, CurrentAccountState: {currentAccountState}")
        {
            InvitedAccountId = invitedAccountId;
            CurrentAccountState = currentAccountState;
        }

        public Guid InvitedAccountId { get; private set; }

        public AccountState CurrentAccountState { get; private set; }
    }
}
