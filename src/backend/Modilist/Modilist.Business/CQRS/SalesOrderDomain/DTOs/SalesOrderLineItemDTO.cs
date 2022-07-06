
using Mapster;

using Modilist.Business.CQRS.ProductDomain.DTOs;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class SalesOrderLineItemDTO
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public SalesOrderLineItemState State { get; set; }

        public ProductDTO Product { get; set; }

        public LineItemFeedbackDTO Feedback { get; set; }
    }
}
