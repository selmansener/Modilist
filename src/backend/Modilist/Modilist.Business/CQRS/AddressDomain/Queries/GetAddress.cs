
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.AddressDomain.DTOs;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Business.CQRS.AddressDomain.Queries
{
    public class GetAddress : IRequest<AddressDTO>
    {
        public int Id { get; set; }

        public Guid AccountId { get; set; }
    }

    internal class GetAddressValidator : AbstractValidator<GetAddress>
    {
        public GetAddressValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetAddressHandler : IRequestHandler<GetAddress, AddressDTO>
    {
        private readonly IAddressRepository _addressRepository;

        public GetAddressHandler(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<AddressDTO> Handle(GetAddress request, CancellationToken cancellationToken)
        {
            Address? address = await _addressRepository.GetByAccountIdAsync(request.Id, request.AccountId, cancellationToken);

            if (address == null)
            {
                // TODO: change exception type
                throw new Exception("address not found for account");
            }

            return address.Adapt<AddressDTO>();
        }
    }
}
