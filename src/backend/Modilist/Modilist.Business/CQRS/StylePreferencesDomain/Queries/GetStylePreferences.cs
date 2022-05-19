
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Data.Repositories.StylePreferencesDomain;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Queries
{
    public class GetStylePreferences : IRequest<StylePreferencesDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetStylePreferencesValidator : AbstractValidator<GetStylePreferences>
    {
        public GetStylePreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetStylePreferencesHandler : IRequestHandler<GetStylePreferences, StylePreferencesDTO>
    {
        private readonly IStylePreferencesReadRepository _stylePreferencesReadRepository;

        public GetStylePreferencesHandler(IStylePreferencesReadRepository stylePreferencesReadRepository)
        {
            _stylePreferencesReadRepository = stylePreferencesReadRepository;
        }

        public async Task<StylePreferencesDTO> Handle(GetStylePreferences request, CancellationToken cancellationToken)
        {
            var stylePreference = await _stylePreferencesReadRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (stylePreference == null)
            {
                // TODO: change exception type
                throw new Exception("StylePreferences not found for account.");
            }

            return stylePreference.Adapt<StylePreferencesDTO>();
        }
    }
}
