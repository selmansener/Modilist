namespace Modilist.Business.Exceptions
{
    internal class DiscountNotFoundException : Exception
    {
        public DiscountNotFoundException(int discountId)
            : base($"Discount not found with following Id: {discountId}")
        {
            DiscountId = discountId;
        }

        public DiscountNotFoundException(string invitationEmail)
            : base($"Discount not found with following email: {invitationEmail}")
        {

        }


        public int DiscountId { get; private set; }

        public string InvitationEmail { get; set; }
    }
}
