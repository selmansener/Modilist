using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.Exceptions
{
    internal class InvalidSubscriptionPlanException : Exception
    {
        public InvalidSubscriptionPlanException(Guid accountId, SubscriptionPlan currentPlan)
            : base($"Subscription Plan is invalid for the account with id: {accountId} CurrentPlan: {currentPlan}")
        {
            accountId = AccountId;
            currentPlan = Plan;
        }

        public Guid AccountId { get; set; }

        public SubscriptionPlan Plan { get; set; }
    }
}
