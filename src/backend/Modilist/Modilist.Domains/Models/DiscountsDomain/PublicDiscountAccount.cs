using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.DiscountsDomain
{
    public class PublicDiscountAccount : BaseEntity
    {
        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public int PublicDiscountId { get; private set; }

        public PublicDiscount PublicDiscount { get; private set; }
    }
}
