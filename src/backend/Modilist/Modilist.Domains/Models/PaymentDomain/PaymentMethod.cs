
using FluentValidation;

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

        public string? CardName { get; private set; }

        public string? CardUserKey { get; private set; }

        public string? CardToken { get; private set; }

        public string? CardAssociation { get; private set; }

        public string? CardFamily { get; private set; }

        public string? CardBankName { get; private set; }

        public long? CardBankCode { get; private set; }

        public string? BinNumber { get; private set; }

        public bool IsDefault { get; private set; }

        public void ChangeDefault(bool isDefault)
        {
            IsDefault = isDefault;
        }

        public void UpdateCardInfo(
            string cardUserKey,
            string cardToken,
            string cardAssociation,
            string cardFamily,
            string cardBankName,
            long? cardBankCode,
            string binNumber,
            string cardName)
        {
            CardName = cardName;
            CardUserKey = cardUserKey;
            CardToken = cardToken;
            CardAssociation = cardAssociation;
            CardFamily = cardFamily;
            CardBankName = cardBankName;
            CardBankCode = cardBankCode;
            BinNumber = binNumber;

            var validator = new PaymentMethodCardInfoValidator();

            validator.ValidateAndThrow(this);
        }
    }

    internal class PaymentMethodCardInfoValidator : AbstractValidator<PaymentMethod>
    {
        public PaymentMethodCardInfoValidator()
        {
            RuleFor(x => x.CardUserKey).NotEmpty();
            RuleFor(x => x.CardToken).NotEmpty();
            RuleFor(x => x.CardAssociation).NotEmpty();
            RuleFor(x => x.CardFamily).NotEmpty();
            RuleFor(x => x.CardBankName).NotEmpty();
        }
    }
}
