using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.DiscountsDomain
{
    public class ExclusiveDiscount : Discount
    {
        public ExclusiveDiscount(Guid accountId, Currency currency, DiscountType type) 
            : base(currency, type)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string? InvitedAccountEmail { get; private set; }

        public static ExclusiveDiscount CreateInvitationSentDiscount(Guid accountId, Currency currency, string invitedAccountEmail)
        {
            if (string.IsNullOrEmpty(invitedAccountEmail))
            {
                throw new ArgumentNullException(nameof(invitedAccountEmail));
            }

            var discount = new ExclusiveDiscount(accountId, currency, DiscountType.InvitationSentDiscount)
            {
                InvitedAccountEmail = invitedAccountEmail
            };

            return discount;
        }
    }
}
