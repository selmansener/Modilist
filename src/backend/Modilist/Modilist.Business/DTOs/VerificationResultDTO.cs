using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.DTOs
{
    public class VerificationResultDTO
    {
        public string RedirectUrl { get; set; }

        public bool IsSuccess { get; set; }
    }
}
