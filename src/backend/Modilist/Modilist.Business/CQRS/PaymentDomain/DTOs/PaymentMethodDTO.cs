﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.PaymentDomain.DTOs
{
    public class PaymentMethodDTO
    {
        public string CardNumber { get; set; }

        public string CardHolderName { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }
    }
}
