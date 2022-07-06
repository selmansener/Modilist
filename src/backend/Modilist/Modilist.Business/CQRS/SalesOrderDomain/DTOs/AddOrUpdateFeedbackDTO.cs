using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class AddOrUpdateFeedbackDTO
    {
        public int SalesOrderId { get; set; }

        public int SalesOrderLineItemId { get; set; }

        public SalesOrderLineItemState SalesOrderLineItemState { get; set; }
    }
}
