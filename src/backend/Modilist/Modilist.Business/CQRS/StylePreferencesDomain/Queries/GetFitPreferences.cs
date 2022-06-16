
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Queries
{
    public class GetFitPreferences : IRequest<FitPreferencesDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetFitPreferencesValidator : AbstractValidator<GetFitPreferences>
    {
        public GetFitPreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetFitPreferencesHandler : IRequestHandler<GetFitPreferences, FitPreferencesDTO>
    {
        private readonly IFitPreferencesRepository _fitPreferencesRepository;

        public GetFitPreferencesHandler(IFitPreferencesRepository fitPreferencesRepository)
        {
            _fitPreferencesRepository = fitPreferencesRepository;
        }

        public async Task<FitPreferencesDTO> Handle(GetFitPreferences request, CancellationToken cancellationToken)
        {
            FitPreferences? fitPreferences = await _fitPreferencesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (fitPreferences == null)
            {
                throw new FitPreferencesNotFoundException(request.AccountId);
            }

            return fitPreferences.Adapt<FitPreferencesDTO>();
        }
    }
}
