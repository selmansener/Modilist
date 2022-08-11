using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.MailService.Models
{
    internal class BeforeAccountCreatePayload
    {
        public string ClientId { get; set; }

        public string Email { get; set; }
    }
}
