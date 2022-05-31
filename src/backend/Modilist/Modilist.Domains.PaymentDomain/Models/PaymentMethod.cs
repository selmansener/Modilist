using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Domains.PaymentDomain.Models
{
    public class PaymentMethod : BaseEntity
    {
        public PaymentMethod(Guid accountId, string cardUserKey, bool isDefault = false)
        {
            AccountId = accountId;
            CardUserKey = cardUserKey;
            IsDefault = isDefault;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string CardUserKey { get; private set; }

        public bool IsDefault { get; private set; }

        public void ChangeDefault(bool isDefault)
        {
            IsDefault = isDefault;
        }
    }
}
