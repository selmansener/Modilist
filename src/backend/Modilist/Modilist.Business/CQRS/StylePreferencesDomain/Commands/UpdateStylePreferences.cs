using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Domains.StylePreferences.Models;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class UpdateStylePreferences : IRequest<StylePreferencesDTO>
    {
        public Guid AccountId { get; set; }

        public string ChoiseReasons { get; set; }

        public float LovesShopping { get; set; }

        public float OpenToSuggestions { get; set; }

        public bool PrefersHijabClothing { get; set; }

        public string BodyPartsToHighlight { get; set; }

        public string BodyPartsToHide { get; set; }

        public string ExcludedCategories { get; set; }

        public string ExcludedColors { get; set; }

        public string ExcludedColorCategories { get; set; }

        public string ExcludedPatterns { get; set; }

        public string ExcludedFabrics { get; set; }
    }

    internal class UpdateStylePreferencesValidator : AbstractValidator<UpdateStylePreferences>
    {
        public UpdateStylePreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class UpdateStylePreferencesHandler : IRequestHandler<UpdateStylePreferences, StylePreferencesDTO>
    {
        private readonly IStylePreferencesWriteRepository _stylePreferencesWriteRepository;

        public UpdateStylePreferencesHandler(IStylePreferencesWriteRepository stylePreferencesWriteRepository)
        {
            _stylePreferencesWriteRepository = stylePreferencesWriteRepository;
        }

        public async Task<StylePreferencesDTO> Handle(UpdateStylePreferences request, CancellationToken cancellationToken)
        {
            var stylePreference = await _stylePreferencesWriteRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (stylePreference == null)
            {
                throw new Exception("StylePreferences for account are not found.");
            }

            stylePreference.UpdateStylePreferences(
                request.ChoiseReasons,
                request.LovesShopping,
                request.OpenToSuggestions,
                request.PrefersHijabClothing,
                request.BodyPartsToHighlight,
                request.BodyPartsToHide,
                request.ExcludedCategories,
                request.ExcludedColors,
                request.ExcludedColorCategories,
                request.ExcludedPatterns,
                request.ExcludedFabrics);

            await _stylePreferencesWriteRepository.UpdateAsync(stylePreference, cancellationToken, true);

            return stylePreference.Adapt<StylePreferencesDTO>();
        }
    }
}
