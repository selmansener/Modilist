using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.PaymentDomain.DTOs
{
    public class PaymentMethodDTO
    {
        public int Id { get; set; }

        public string? CardAssociation { get; set; }

        public string? CardFamily { get; set; }

        public string? CardBankName { get; set; }

        public string CardHolderName { get; set; }

        public long? CardBankCode { get; set; }

        public string BinNumber { get; set; }

        public string CardName { get; set; }

        public bool IsDefault { get; set; }
    }
}
