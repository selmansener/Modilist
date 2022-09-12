
using Modilist.Domains.Base;
using Modilist.Domains.Exceptions;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.DiscountsDomain
{
    public class Discount : BaseEntity
    {
        public Discount(Currency currency, DiscountType type)
        {
            State = DiscountState.Created;
            Type = type;
            Currency = currency;

            switch (Type)
            {
                case DiscountType.OwnAdvertisement:
                    DiscountValue = 0;
                    break;
                case DiscountType.InfluencerAdvertisement:
                    DiscountValue = 0;
                    break;
                case DiscountType.Seasonal:
                    DiscountValue = 0;
                    break;
                case DiscountType.Corporate:
                    DiscountValue = 0;
                    break;
                case DiscountType.InvitationSentDiscount:
                    DiscountValue = 10;
                    ExpireDate = DateTime.UtcNow.AddDays(14);
                    break;
                case DiscountType.InvitationAcceptDiscount:
                    DiscountValue = 0;
                    break;
                case DiscountType.NewMemberDiscount:
                    DiscountValue = 20;
                    break;
                case DiscountType.ProductSpecificDiscount:
                    DiscountValue = 0;
                    break;
                case DiscountType.PrelovedDiscount:
                    DiscountValue = 0;
                    break;
                default:
                    break;
            }
        }

        public DiscountState State { get; private set; }

        public DiscountType Type { get; private set; }

        public DateTime? ExpireDate { get; private set; }

        public decimal DiscountValue { get; private set; }

        public Currency Currency { get; private set; }

        public void Activate()
        {
            if (ExpireDate != null && DateTime.UtcNow > ExpireDate)
            {
                throw new DiscountExpiredException(Id);
            }

            if (State == DiscountState.Active)
            {
                throw new InvalidDiscountStateException(Id, DiscountState.Active);
            }

            State = DiscountState.Active;
        }
    }
}
