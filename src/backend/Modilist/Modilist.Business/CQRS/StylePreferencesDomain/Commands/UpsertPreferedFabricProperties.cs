using System.Text.Json.Serialization;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class UpsertPreferedFabricProperties : IRequest<PreferedFabricPropertiesDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string? ExcludedColors { get; set; }

        public string? ExcludedColorCategories { get; set; }

        public string? ExcludedPatterns { get; set; }
        
        public string? ExcludedFabrics { get; set; }
        
        public string? ExcludedAccessoryColors{ get; set; }

        public string? Allergens { get; set; }

        public string? AdditionalNotes { get; set; }

    }

    internal class UpsertPreferedFabricPropertiesValidator : AbstractValidator<UpsertPreferedFabricProperties>
    {
        public UpsertPreferedFabricPropertiesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class UpsertPreferedFabricPropertiesHandler : IRequestHandler<UpsertPreferedFabricProperties, PreferedFabricPropertiesDTO>
    {
        private readonly IPreferedFabricPropertiesRepository _preferedFabricPropertiesRepository;
        private readonly IAccountRepository _accountRepository;

        public UpsertPreferedFabricPropertiesHandler(IPreferedFabricPropertiesRepository preferedFabricPropertiesRepository, IAccountRepository accountRepository)
        {
            _preferedFabricPropertiesRepository = preferedFabricPropertiesRepository;
            _accountRepository = accountRepository;
        }

        public async Task<PreferedFabricPropertiesDTO> Handle(UpsertPreferedFabricProperties request, CancellationToken cancellationToken)
        {
            PreferedFabricProperties? preferedFabricProperties = await _preferedFabricPropertiesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (preferedFabricProperties == null)
            {
                preferedFabricProperties = new PreferedFabricProperties(
                    request.AccountId,
                    request.ExcludedColors,
                    request.ExcludedColorCategories,
                    request.ExcludedPatterns,
                    request.ExcludedFabrics,
                    request.ExcludedAccessoryColors,
                    request.Allergens,
                    request.AdditionalNotes);

                await _preferedFabricPropertiesRepository.AddAsync(preferedFabricProperties, cancellationToken);

                Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

                if (account == null)
                {
                    throw new AccountNotFoundInternalException(request.AccountId);
                }

                account.SetPreferedFabricProperties(preferedFabricProperties.Id);

                await _accountRepository.UpdateAsync(account, cancellationToken);
            }
            else
            {
                preferedFabricProperties.Update(
                    request.ExcludedColors,
                    request.ExcludedColorCategories,
                    request.ExcludedPatterns,
                    request.ExcludedFabrics,
                    request.ExcludedAccessoryColors,
                    request.Allergens,
                    request.AdditionalNotes);

                await _preferedFabricPropertiesRepository.UpdateAsync(preferedFabricProperties, cancellationToken);
            }

            return preferedFabricProperties.Adapt<PreferedFabricPropertiesDTO>();
        }
    }
}
