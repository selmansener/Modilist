
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreateFirstSalesOrder : IRequest<SalesOrderDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class CreateFirstSalesOrderValidator : AbstractValidator<CreateFirstSalesOrder>
    {
        public CreateFirstSalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateFirstSalesOrderHandler : IRequestHandler<CreateFirstSalesOrder, SalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;

        public CreateFirstSalesOrderHandler(ISalesOrderRepository salesOrderRepository, IAddressRepository addressRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _addressRepository = addressRepository;
        }

        public async Task<SalesOrderDTO> Handle(CreateFirstSalesOrder request, CancellationToken cancellationToken)
        {
            var doesAccountHasAnyOrder = await _salesOrderRepository.DoesAccountHasAnyOrder(request.AccountId, cancellationToken);

            if (doesAccountHasAnyOrder)
            {
                throw new FirstOrderAlreadyCreatedException(request.AccountId);
            }

            Address? address = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new DefaultAddressNotFoundException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return salesOrder.Adapt<SalesOrderDTO>();
        }
    }
}
