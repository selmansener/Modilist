﻿
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SubscriptionDomain.DTOs
{
    public class SubscriptionDTO
    {
        public DateTime StartedAt { get; set; }

        public DateTime? ReactivatedAt { get; set; }

        public DateTime? SuspendedAt { get; set; }

        public DateTime? BlockedAt { get; set; }

        public DateTime? ClosedAt { get; set; }

        public SubscriptionState State { get; set; }

        public SubscriptionSuspentionReason SuspentionReason { get; set; }

        public SubscriptionBlockingReason BlockingReason { get; set; }

        public int MaxPricingLimit { get; set; }
    }
}