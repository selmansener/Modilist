using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.CQRS.AddressDomain.DTOs;
using Modilist.Data.Repositories.AddressDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.AddressDomain.Queries
{
    public class GetAllAddresses : IRequest<IEnumerable<AddressDTO>>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class GetAllAddressesValidator : AbstractValidator<GetAllAddresses>
    {
        public GetAllAddressesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetAllAddressesHandler : IRequestHandler<GetAllAddresses, IEnumerable<AddressDTO>>
    {
        private readonly IAddressRepository _addressRepository;

        public GetAllAddressesHandler(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<IEnumerable<AddressDTO>> Handle(GetAllAddresses request, CancellationToken cancellationToken)
        {
            return await _addressRepository.GetAllAsNoTracking()
                .ProjectToType<AddressDTO>()
                .Where(x => x.AccountId == request.AccountId)
                .ToListAsync(cancellationToken);
        }
    }
}
