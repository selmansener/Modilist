
using System.Text.Json.Serialization;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Queries
{
    public class GetPreferedFabricProperties : IRequest<PreferedFabricPropertiesDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class GetPreferedFabricPropertiesValidator : AbstractValidator<GetPreferedFabricProperties>
    {
        public GetPreferedFabricPropertiesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetPreferedFabricPropertiesHandler : IRequestHandler<GetPreferedFabricProperties, PreferedFabricPropertiesDTO>
    {
        private readonly IPreferedFabricPropertiesRepository _preferedFabricPropertiesRepository;

        public GetPreferedFabricPropertiesHandler(IPreferedFabricPropertiesRepository preferedFabricPropertiesRepository)
        {
            _preferedFabricPropertiesRepository = preferedFabricPropertiesRepository;
        }

        public async Task<PreferedFabricPropertiesDTO> Handle(GetPreferedFabricProperties request, CancellationToken cancellationToken)
        {
            PreferedFabricProperties? preferedFabricProperties = await _preferedFabricPropertiesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (preferedFabricProperties == null)
            {
                throw new PreferedFabricPropertiesNotFoundException(request.AccountId);
            }

            return preferedFabricProperties.Adapt<PreferedFabricPropertiesDTO>();
        }
    }
}
