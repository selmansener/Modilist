using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class AddSalesOrderLineItemDTO
    {
        public int Id { get; set; }

        public int SalesOrderId { get; private set; }

        public SalesOrderLineItemState State { get; private set; }

        public int ProductId { get; private set; }
    }
}
