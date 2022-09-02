
using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.SubscriptionDomain
{
    public class SubscriptionStateLog : BaseEntity
    {
        private readonly List<SubscriptionSuspentionReason> _suspentionReasons = new List<SubscriptionSuspentionReason>();

        public SubscriptionStateLog(int subscriptionId, SubscriptionState previousState, SubscriptionState currentState)
        {
            SubscriptionId = subscriptionId;
            PreviousState = previousState;
            CurrentState = currentState;
        }

        public int SubscriptionId { get; private set; }

        public Subscription Subscription { get; private set; }

        public SubscriptionState PreviousState { get; private set; }

        public SubscriptionState CurrentState { get; private set; }

        public IReadOnlyList<SubscriptionSuspentionReason> SuspentionReasons => _suspentionReasons;

        internal void AddSuspentionReason(SubscriptionSuspentionReason suspentionReason)
        {
            _suspentionReasons.Add(suspentionReason);
        }
    }
}
