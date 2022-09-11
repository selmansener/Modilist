
using FluentValidation;

using Modilist.Domains.Base;
using Modilist.Domains.Exceptions;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.ProductDomain;
using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Domains.Models.PaymentDomain
{
    public class Payment : BaseEntity
    {
        private readonly List<PaymentLineItem> _lineItems = new List<PaymentLineItem>();

        public Payment(Guid accountId, int salesOrderId)
        {
            AccountId = accountId;
            SalesOrderId = salesOrderId;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public int SalesOrderId { get; private set; }

        public SalesOrder SalesOrder { get; private set; }

        public decimal TotalPrice { get; private set; } = 0;

        public decimal TotalPriceWithoutVAT { get; private set; } = 0;

        public decimal TotalDiscount { get; private set; } = 0;

        public IReadOnlyList<PaymentLineItem> LineItems => _lineItems;

        // TODO: add discounts

        // TODO: add invoice

        public void AddLineItem(Product product, string paymentTransactionId)
        {
            if (_lineItems.Any(x => x.ProductId == product.Id))
            {
                throw new DuplicatePaymentLineItemException(AccountId, Id, product.Id);
            }

            _lineItems.Add(new PaymentLineItem(Id, product.Id, product.Price, product.PriceWithoutVAT, paymentTransactionId));

            TotalPrice += product.Price;
            TotalPriceWithoutVAT += product.PriceWithoutVAT;

            var validator = new PaymentAddLineItemValidator();
            validator.ValidateAndThrow(this);
        }
    }

    internal class PaymentAddLineItemValidator : AbstractValidator<Payment>
    {
        public PaymentAddLineItemValidator()
        {
            RuleFor(x => x.TotalPrice).NotEmpty();
            RuleFor(x => x.TotalPriceWithoutVAT).NotEmpty();
        }
    }
}
