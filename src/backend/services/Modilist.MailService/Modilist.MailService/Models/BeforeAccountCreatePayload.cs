using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;

namespace Modilist.MailService.Models
{
    internal class BeforeAccountCreatePayload
    {
        [JsonProperty("client_id")]
        public string ClientId { get; set; }

        public string Email { get; set; }
    }
}
