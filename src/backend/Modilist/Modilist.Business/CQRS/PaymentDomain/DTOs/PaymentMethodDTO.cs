using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.PaymentDomain.DTOs
{
    public class PaymentMethodDTO
    {
        public string? CardAssociation { get; set; }

        public string? CardFamily { get; set; }

        public string? CardBankName { get; set; }

        public string ExpireYear { get; set; }

        public string CVC { get; set; }

        public long? CardBankCode { get; set; }

        public string? LastFourDigit { get; set; }

        public bool IsDefault { get; set; }
    }
}
