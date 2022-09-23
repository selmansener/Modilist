
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.ProductDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class AddSalesOrderLineItem : IRequest<AddSalesOrderLineItemDTO>
    {
        [JsonIgnore]
        public int SalesOrderId { get; set; }

        public Guid AccountId { get; set; }

        public int ProductId { get; set; }
    }

    internal class AddSalesOrderLineItemValidator : AbstractValidator<AddSalesOrderLineItem>
    {
        public AddSalesOrderLineItemValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.ProductId).NotEmpty();
        }
    }

    internal class AddSalesOrderLineItemHandler : IRequestHandler<AddSalesOrderLineItem, AddSalesOrderLineItemDTO>
    {
        private readonly IProductRepository _productRepository;
        private readonly ISalesOrderRepository _salesOrderRepository;

        public AddSalesOrderLineItemHandler(IProductRepository productRepository, ISalesOrderRepository salesOrderRepository)
        {
            _productRepository = productRepository;
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<AddSalesOrderLineItemDTO> Handle(AddSalesOrderLineItem request, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetByIdAsync(request.ProductId, cancellationToken);

            if (product == null)
            {
                throw new ProductNotFoundException(request.ProductId);
            }

            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken, includeLineItems: true);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            var salesOrderLineItem = salesOrder.AddLineItem(request.ProductId, product.Price, product.SalesPrice);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return salesOrderLineItem.Adapt<AddSalesOrderLineItemDTO>();
        }
    }
}
