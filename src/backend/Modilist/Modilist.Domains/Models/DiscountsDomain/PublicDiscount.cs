
using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.DiscountsDomain
{
    public class PublicDiscount : Discount
    {
        private readonly List<Account> _accounts = new List<Account>();

        public PublicDiscount(Currency currency, DiscountType type, int maxLimit)
            : base(currency, type)
        {
            MaxLimit = maxLimit;
        }

        public IReadOnlyList<Account> Accounts => _accounts;

        public int MaxLimit { get; private set; }
    }
}
