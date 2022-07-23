
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.ReturnDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.ReturnDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.ReturnDomain;

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

        public CreateReturnHandler(IReturnRepository returnRepository, IAddressRepository addressRepository)
        {
            _returnRepository = returnRepository;
            _addressRepository = addressRepository;
        }

        public async Task<ReturnDTO> Handle(CreateReturn request, CancellationToken cancellationToken)
        {
            Return? @return = await _returnRepository.GetBySalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (@return == null)
            {
                throw new ReturnAlreadyExistsException(request.AccountId, request.SalesOrderId);
            }

            // TODO: Create shipment

            Address? address = await _addressRepository.GetByAccountIdAsync(request.AddressId, request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new AddressNotFoundException(request.AccountId, request.AddressId);
            }

            @return = new Return(request.AccountId, request.SalesOrderId, request.RequestedPickupDate);

            @return.AssignAddress(address);

            await _returnRepository.AddAsync(@return, cancellationToken);

            return @return.Adapt<ReturnDTO>();
        }
    }
}
