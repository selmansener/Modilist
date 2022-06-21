
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.SubscriptionDomain
{
    public class Subscription : BaseEntity
    {
        public Subscription(Guid accountId)
        {
            AccountId = accountId;
            State = SubscriptionState.Active;
            StartedAt = DateTime.UtcNow;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public DateTime StartedAt { get; private set; }

        public DateTime? ReactivatedAt { get; private set; }

        public DateTime? SuspendedAt { get; private set; }

        public DateTime? BlockedAt { get; private set; }

        public DateTime? ClosedAt { get; private set; }

        public SubscriptionState State { get; private set; }

        public SubscriptionSuspentionReason SuspentionReason { get; private set; }

        public SubscriptionBlockingReason BlockingReason { get; private set; }

        public int MaxPricingLimit { get; private set; }

        public void SetMaxPricingLimit(int maxPricingLimit)
        {
            if (maxPricingLimit < 500)
            {
                throw new InvalidOperationException("MaxPricingLimit can not be less than 500");
            }

            MaxPricingLimit = maxPricingLimit;
        }
    }
}
