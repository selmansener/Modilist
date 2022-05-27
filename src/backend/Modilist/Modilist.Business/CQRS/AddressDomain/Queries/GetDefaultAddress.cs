using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.AddressDomain.DTOs;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Domains.AddressDomain.Models;

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
        private readonly IAddressReadRepository _addressReadRepository;

        public GetDefaultAddressHandler(IAddressReadRepository addressReadRepository)
        {
            _addressReadRepository = addressReadRepository;
        }

        public async Task<AddressDTO> Handle(GetDefaultAddress request, CancellationToken cancellationToken)
        {
            Address address = await _addressReadRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (address == null)
            {
                // TODO: change exception type

                throw new Exception("Default address not found for account");
            }

            return address.Adapt<AddressDTO>();
        }
    }
}
