
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class CreateStylePreferences : IRequest<StylePreferencesDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class CreateStylePreferencesValidator : AbstractValidator<CreateStylePreferences>
    {
        public CreateStylePreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateStylePreferencesHandler : IRequestHandler<CreateStylePreferences, StylePreferencesDTO>
    {
        private readonly IStylePreferencesRepository _stylePreferencesRepository;

        public CreateStylePreferencesHandler(IStylePreferencesRepository stylePreferencesRepository)
        {
            _stylePreferencesRepository = stylePreferencesRepository;
        }

        public async Task<StylePreferencesDTO> Handle(CreateStylePreferences request, CancellationToken cancellationToken)
        {
            var stylePreference = await _stylePreferencesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (stylePreference != null)
            {
                // TODO: change exception type
                throw new Exception("StylePreferences already created for account");
            }

            stylePreference = new StylePreference(request.AccountId);

            await _stylePreferencesRepository.AddAsync(stylePreference, cancellationToken, true);

            return stylePreference.Adapt<StylePreferencesDTO>();
        }
    }
}
