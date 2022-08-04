
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class UpdateSalesOrderAddress : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int SalesOrderId { get; set; }

        public int AddressId { get; set; }
    }

    internal class UpdateSalesOrderAddressValidator : AbstractValidator<UpdateSalesOrderAddress>
    {
        public UpdateSalesOrderAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
            RuleFor(x => x.AddressId).NotEmpty();
        }
    }

    internal class UpdateSalesOrderAddressHandler : IRequestHandler<UpdateSalesOrderAddress>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;

        public UpdateSalesOrderAddressHandler(ISalesOrderRepository salesOrderRepository, IAddressRepository addressRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _addressRepository = addressRepository;
        }

        public async Task<Unit> Handle(UpdateSalesOrderAddress request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetWithAddressAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            Address? address = await _addressRepository.GetByAccountIdAsync(request.AddressId, request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new AddressNotFoundException(request.AccountId, request.AddressId);
            }

            salesOrder.AssignAddress(address);

            await _salesOrderRepository.UpdateAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
