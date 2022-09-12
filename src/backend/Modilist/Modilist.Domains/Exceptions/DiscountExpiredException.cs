namespace Modilist.Domains.Exceptions
{
    internal class DiscountExpiredException : Exception
    {
        public DiscountExpiredException(int discountId)
            : base($"Discount expired. AdditionalInfo: DiscountId: {discountId}")
        {
            DiscountId = discountId;
        }

        public int DiscountId { get; private set; }
    }
}
