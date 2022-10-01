
using System.Numerics;

using Microsoft.CodeAnalysis.CSharp;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.SubscriptionDomain
{
    public class Subscription : BaseEntity
    {
        private readonly List<SubscriptionStateLog> _stateLogs = new List<SubscriptionStateLog>();

        public Subscription(Guid accountId)
        {
            AccountId = accountId;
            State = SubscriptionState.Active;
            StartedAt = DateTime.UtcNow;
            MaxPricingLimit = "2500";
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public DateTime StartedAt { get; private set; }

        public DateTime? ActivatedAt { get; private set; }

        public DateTime? SuspendedAt { get; private set; }

        public DateTime? BlockedAt { get; private set; }

        public DateTime? ClosedAt { get; private set; }

        public SubscriptionState State { get; private set; }

        public string MaxPricingLimit { get; private set; }

        public int MaxPricingLimitAsInt { get; private set; }

        public IReadOnlyList<SubscriptionStateLog> StateLogs => _stateLogs;

        public void SetMaxPricingLimit(string maxPricingLimit)
        {
            int result;

            if (int.TryParse(maxPricingLimit, out result) && result < 1500)
            {
                throw new InvalidOperationException("MaxPricingLimit can not be less than 1500");
            }
            else if(!int.TryParse(maxPricingLimit, out result) && !maxPricingLimit.Equals("+5000"))
            {
                throw new InvalidOperationException("MaxPricingLimit must be a valid integer");
            }
            else if(maxPricingLimit.Equals("+5000"))
            {
                result = 9999;
            }
            else
            {
                int.TryParse(maxPricingLimit, out result);
            }

            MaxPricingLimit = maxPricingLimit;
            MaxPricingLimitAsInt = result;
        }

        public void Suspend(IEnumerable<SubscriptionSuspentionReason> suspentionReasons)
        {
            if (State == SubscriptionState.Suspended)
            {
                throw new InvalidOperationException("Subscription already suspended.");
            }

            var stateLog = new SubscriptionStateLog(Id, State, SubscriptionState.Suspended);
            foreach (var suspentionReason in suspentionReasons)
            {
                stateLog.AddSuspentionReason(suspentionReason);
            }

            _stateLogs.Add(stateLog);

            State = SubscriptionState.Suspended;
            SuspendedAt = DateTime.UtcNow;
        }

        public void Activate()
        {
            if (State == SubscriptionState.Active)
            {
                throw new InvalidOperationException("Subscription already active.");
            }

            _stateLogs.Add(new SubscriptionStateLog(Id, State, SubscriptionState.Active));

            State = SubscriptionState.Active;
            ActivatedAt = DateTime.UtcNow;
        }
    }
}
