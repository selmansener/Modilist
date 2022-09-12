
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Exceptions
{
    internal class InvalidDiscountStateException : Exception
    {
        public InvalidDiscountStateException(int discountId, DiscountState state)
            : base($"Discount is already {state}. AdditionalInfo: DiscountId: {discountId}")
        {
            DiscountId = discountId;
            State = state;
        }

        public int DiscountId { get; private set; }

        public DiscountState State { get; private set; }
    }
}
