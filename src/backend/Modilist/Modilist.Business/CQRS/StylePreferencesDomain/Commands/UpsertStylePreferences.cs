using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class UpsertStylePreferences : IRequest<StylePreferencesDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string ChoiceReasons { get; set; }

        public float LovesShopping { get; set; }

        public float OpenToSuggestions { get; set; }

        public bool PrefersHijabClothing { get; set; }

        public string? BodyPartsToHighlight { get; set; }

        public string? BodyPartsToHide { get; set; }

        public string? ExcludedUpperCategories { get; set; }

        public string? ExcludedLowerCategories { get; set; }

        public string? ExcludedOuterCategories { get; set; }

        public string? ExcludedUnderwearCategories { get; set; }

        public string? ExcludedAccessoryCategories { get; set; }

        public string? ExcludedFootwearCategories { get; set; }

        public string? ExcludedBagCategories { get; set; }
    }

    internal class UpsertStylePreferencesValidator : AbstractValidator<UpsertStylePreferences>
    {
        public UpsertStylePreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.LovesShopping).NotEmpty();
            RuleFor(x => x.OpenToSuggestions).NotEmpty();
            RuleFor(x => x.ChoiceReasons).NotEmpty();
        }
    }

    internal class UpsertStylePreferencesHandler : IRequestHandler<UpsertStylePreferences, StylePreferencesDTO>
    {
        private readonly IStylePreferencesRepository _stylePreferencesRepository;
        private readonly IAccountRepository _accountRepository;

        public UpsertStylePreferencesHandler(IStylePreferencesRepository stylePreferencesRepository, IAccountRepository accountRepository)
        {
            _stylePreferencesRepository = stylePreferencesRepository;
            _accountRepository = accountRepository;
        }

        public async Task<StylePreferencesDTO> Handle(UpsertStylePreferences request, CancellationToken cancellationToken)
        {
            StylePreferences? stylePreferences = await _stylePreferencesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (stylePreferences == null)
            {
                stylePreferences = new StylePreferences(
                    request.AccountId,
                    request.ChoiceReasons,
                    request.LovesShopping,
                    request.OpenToSuggestions,
                    request.PrefersHijabClothing,
                    request.BodyPartsToHighlight,
                    request.BodyPartsToHide,
                    request.ExcludedUpperCategories,
                    request.ExcludedLowerCategories,
                    request.ExcludedOuterCategories,
                    request.ExcludedUnderwearCategories,
                    request.ExcludedAccessoryCategories,
                    request.ExcludedFootwearCategories,
                    request.ExcludedBagCategories);


                await _stylePreferencesRepository.AddAsync(stylePreferences, cancellationToken);

                Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

                if (account == null)
                {
                    throw new AccountNotFoundInternalException(request.AccountId);
                }

                account.SetStylePreferences(stylePreferences.Id);

                await _accountRepository.UpdateAsync(account, cancellationToken);
            }
            else
            {
                stylePreferences.UpdateStylePreferences(
                    request.ChoiceReasons,
                    request.LovesShopping,
                    request.OpenToSuggestions,
                    request.PrefersHijabClothing,
                    request.BodyPartsToHighlight,
                    request.BodyPartsToHide,
                    request.ExcludedUpperCategories,
                    request.ExcludedLowerCategories,
                    request.ExcludedOuterCategories,
                    request.ExcludedUnderwearCategories,
                    request.ExcludedAccessoryCategories,
                    request.ExcludedFootwearCategories,
                    request.ExcludedBagCategories);

                await _stylePreferencesRepository.UpdateAsync(stylePreferences, cancellationToken);

            }
            
            return stylePreferences.Adapt<StylePreferencesDTO>();
        }

    }
}
