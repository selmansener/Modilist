
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.ReturnDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.ReturnDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.ReturnDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.ReturnDomain.Commands
{
    public class CreateReturn : IRequest<ReturnDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }

        public int AddressId { get; set; }

        public DateTime RequestedPickupDate { get; set; }
    }

    internal class CreateReturnValidator : AbstractValidator<CreateReturn>
    {
        public CreateReturnValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.RequestedPickupDate).NotEmpty();
        }
    }

    internal class CreateReturnHandler : IRequestHandler<CreateReturn, ReturnDTO>
    {
        private readonly IReturnRepository _returnRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ISalesOrderRepository _salesOrderRepository;

        public CreateReturnHandler(IReturnRepository returnRepository, IAddressRepository addressRepository, ISalesOrderRepository salesOrderRepository)
        {
            _returnRepository = returnRepository;
            _addressRepository = addressRepository;
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<ReturnDTO> Handle(CreateReturn request, CancellationToken cancellationToken)
        {
            Return? @return = await _returnRepository.GetBySalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (@return != null)
            {
                throw new ReturnAlreadyExistsException(request.AccountId, request.SalesOrderId);
            }

            // TODO: Create shipment

            Address? address = await _addressRepository.GetByAccountIdAsync(request.AddressId, request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new AddressNotFoundException(request.AccountId, request.AddressId);
            }

            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken, includeLineItems: true);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            @return = new Return(request.AccountId, request.SalesOrderId, request.RequestedPickupDate);

            @return.AssignAddress(address);

            var returnedLineItems = salesOrder.LineItems.Where(x => x.State == Infrastructure.Shared.Enums.SalesOrderLineItemState.Returned);

            foreach (var lineItem in returnedLineItems)
            {
                @return.AddReturnLineItem(lineItem.ProductId);
            }

            await _returnRepository.AddAsync(@return, cancellationToken);

            return @return.Adapt<ReturnDTO>();
        }
    }
}
