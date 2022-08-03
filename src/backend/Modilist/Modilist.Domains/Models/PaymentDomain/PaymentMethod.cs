
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

        public string? CardUserKey { get; private set; }

        public string? CardHolderName { get; private set; }

        public string? CardToken { get; private set; }

        public string? CardAssociation { get; private set; }

        public string? CardFamily { get; private set; }

        public string? CardBankName { get; private set; }

        public long? CardBankCode { get; private set; }

        public string? ExpireMonth { get; private set; }

        public string? ExpireYear { get; private set; }

        public string? LastFourDigit { get; private set; }

        public string? CVC { get; private set; }

        public bool IsDefault { get; private set; }

        public void ChangeDefault(bool isDefault)
        {
            IsDefault = isDefault;
        }

        public void UpdateCardInfo(
            string cardUserKey,
            string cardHolderName,
            string cardToken,
            string cardAssociation,
            string cardFamily,
            string cardBankName,
            long? cardBankCode,
            string lastFourDigit,
            string cvc,
            string expireMonth,
            string expireYear)
        {
            CardUserKey = cardUserKey;
            CardHolderName = cardHolderName;
            CardToken = cardToken;
            CardAssociation = cardAssociation;
            CardFamily = cardFamily;
            CardBankName = cardBankName;
            CardBankCode = cardBankCode;
            LastFourDigit = lastFourDigit;
            ExpireMonth = expireMonth;
            ExpireYear = expireYear;
            CVC = cvc;

            var validator = new PaymentMethodCardInfoValidator();

            validator.ValidateAndThrow(this);
        }
    }

    internal class PaymentMethodCardInfoValidator : AbstractValidator<PaymentMethod>
    {
        public PaymentMethodCardInfoValidator()
        {
            RuleFor(x => x.CardUserKey).NotEmpty();
            RuleFor(x => x.CardHolderName).NotEmpty();
            RuleFor(x => x.CardToken).NotEmpty();
            RuleFor(x => x.CardAssociation).NotEmpty();
            RuleFor(x => x.CardFamily).NotEmpty();
            RuleFor(x => x.CardBankName).NotEmpty();
            RuleFor(x => x.LastFourDigit).NotEmpty();
            RuleFor(x => x.CVC).NotEmpty();
            RuleFor(x => x.ExpireMonth).NotEmpty();
            RuleFor(x => x.ExpireYear).NotEmpty();
        }
    }
}
