
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
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
        private readonly IStylePreferencesRepository _stylePreferencesRepository;

        public GetStylePreferencesHandler(IStylePreferencesRepository stylePreferencesRepository)
        {
            _stylePreferencesRepository = stylePreferencesRepository;
        }

        public async Task<StylePreferencesDTO> Handle(GetStylePreferences request, CancellationToken cancellationToken)
        {
            var stylePreference = await _stylePreferencesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (stylePreference == null)
            {
                throw new StylePreferencesNotFoundException(request.AccountId);
            }

            return stylePreference.Adapt<StylePreferencesDTO>();
        }
    }
}
