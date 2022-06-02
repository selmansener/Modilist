
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.AddressDomain.DTOs;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Domains.Models.AddressDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.AddressDomain.Commands
{
    public class UpdateAddress : IRequest<AddressDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public string Name { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string ZipCode { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string FullAddress { get; set; }

        public bool IsDefault { get; set; }
    }

    internal class UpdateAddressValidator : AbstractValidator<UpdateAddress>
    {
        public UpdateAddressValidator()
        {
            RuleFor(c => c.AccountId).NotEmpty();
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.FirstName).NotEmpty();
            RuleFor(c => c.LastName).NotEmpty();
            RuleFor(c => c.Phone).NotEmpty();
            RuleFor(c => c.City).NotEmpty();
            RuleFor(c => c.District).NotEmpty();
            RuleFor(c => c.FullAddress).NotEmpty();
        }
    }

    internal class UpdateAddressHandler : IRequestHandler<UpdateAddress, AddressDTO>
    {
        private readonly IAddressRepository _addressWriteRepository;

        public UpdateAddressHandler(IAddressRepository addressWriteRepository)
        {
            _addressWriteRepository = addressWriteRepository;
        }

        public async Task<AddressDTO> Handle(UpdateAddress request, CancellationToken cancellationToken)
        {
            Address? address = await _addressWriteRepository.GetByNameAsync(request.Name, request.AccountId, cancellationToken);

            if (address == null)
            {
                // TODO: change exception type

                throw new Exception("Address not found with name for account");
            }

            address.UpdateAddress(
                request.FirstName,
                request.LastName,
                request.Phone,
                request.ZipCode,
                request.City,
                request.District,
                request.FullAddress,
                request.IsDefault);

            if (request.IsDefault)
            {
                var defaultAddress = await _addressWriteRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

                if (defaultAddress != null)
                {
                    defaultAddress.ChangeDefault(false);

                    await _addressWriteRepository.UpdateAsync(defaultAddress, cancellationToken);
                }
            }

            await _addressWriteRepository.UpdateAsync(address, cancellationToken);

            return address.Adapt<AddressDTO>();
        }
    }
}
