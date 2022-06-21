
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.PaymentDomain
{
    public class PaymentMethod : BaseEntity
    {
        public PaymentMethod(Guid accountId, bool isDefault = false)
        {
            AccountId = accountId;
            IsDefault = isDefault;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string? CardUserKey { get; private set; }

        public bool IsDefault { get; private set; }

        public void ChangeDefault(bool isDefault)
        {
            IsDefault = isDefault;
        }

        public void UpdateCardUserKey(string cardUserKey)
        {
            if (string.IsNullOrEmpty(cardUserKey))
            {
                throw new InvalidOperationException("CardUserKey can not be null or default");
            }

            CardUserKey = cardUserKey;
        }
    }
}
