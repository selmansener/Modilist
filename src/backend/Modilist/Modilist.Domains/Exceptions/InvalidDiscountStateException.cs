
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Exceptions
{
    internal class InvalidDiscountStateException : Exception
    {
        public InvalidDiscountStateException(int discountId, DiscountState state, string reason)
            : base($"Discount is in an invalid state: {state}, Reason: {reason}. AdditionalInfo: DiscountId: {discountId}")
        {
            DiscountId = discountId;
            State = state;
            Reason = reason;
        }

        public int DiscountId { get; private set; }

        public DiscountState State { get; private set; }

        public string Reason { get; private set; }
    }
}
