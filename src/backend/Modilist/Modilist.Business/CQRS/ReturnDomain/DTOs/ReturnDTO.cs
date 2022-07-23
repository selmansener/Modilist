using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.ReturnDomain.DTOs
{
    public class ReturnDTO
    {
        public int Id { get; set; }

        public int SalesOrderId { get; set; }

        public ReturnAddressDTO ReturnAddress { get; set; }

        public string CargoTrackingCode { get; set; }
    }
}
