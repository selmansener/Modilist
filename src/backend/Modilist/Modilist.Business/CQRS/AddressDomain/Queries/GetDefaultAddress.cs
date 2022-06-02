
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.AddressDomain.DTOs;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Business.CQRS.AddressDomain.Queries
{
    public class GetDefaultAddress : IRequest<AddressDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetDefaultAddressValidator : AbstractValidator<GetDefaultAddress>
    {
        public GetDefaultAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetDefaultAddressHandler : IRequestHandler<GetDefaultAddress, AddressDTO>
    {
        private readonly IAddressRepository _addressRepository;

        public GetDefaultAddressHandler(IAddressRepository addressReadRepository)
        {
            _addressRepository = addressReadRepository;
        }

        public async Task<AddressDTO> Handle(GetDefaultAddress request, CancellationToken cancellationToken)
        {
            Address? address = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (address == null)
            {
                // TODO: change exception type

                throw new Exception("Default address not found for account");
            }

            return address.Adapt<AddressDTO>();
        }
    }
}
