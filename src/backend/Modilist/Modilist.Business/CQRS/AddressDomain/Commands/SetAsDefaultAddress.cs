
using FluentValidation;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Domains.Models.AddressDomain;

namespace Modilist.Business.CQRS.AddressDomain.Commands
{
    public class SetAsDefaultAddress : IRequest
    {
        public Guid AccountId { get; set; }

        public string Name { get; set; }
    }

    internal class SetAsDefaultAddressValidator : AbstractValidator<SetAsDefaultAddress>
    {
        public SetAsDefaultAddressValidator()
        {
            RuleFor(c => c.AccountId).NotEmpty();
            RuleFor(c => c.Name).NotEmpty();
        }
    }

    internal class SetAsDefaultAddressHandler : IRequestHandler<SetAsDefaultAddress>
    {
        private readonly IAddressRepository _addressRepository;

        public SetAsDefaultAddressHandler(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<Unit> Handle(SetAsDefaultAddress request, CancellationToken cancellationToken)
        {
            Address? currentDefaultAddress = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (currentDefaultAddress != null)
            {
                currentDefaultAddress.ChangeDefault(false);

                await _addressRepository.UpdateAsync(currentDefaultAddress, cancellationToken);
            }

            Address? address = await _addressRepository.GetByNameAsync(request.Name, request.AccountId, cancellationToken);

            if (address == null)
            {
                throw new AddressNotFoundException(request.AccountId, request.Name);
            }

            address.ChangeDefault(true);

            await _addressRepository.UpdateAsync(address, cancellationToken);

            return Unit.Value;
        }
    }
}
