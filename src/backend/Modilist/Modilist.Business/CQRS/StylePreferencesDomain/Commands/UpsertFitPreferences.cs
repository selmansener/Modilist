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
    public class UpsertFitPreferences : IRequest<FitPreferencesDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string? WaistHeight { get; set; }

        public string? UpperFit { get; set; }

        public string? LowerFit { get; set; }

        public string? LegFit { get; set; }

        public string? SkirtDressLength { get; set; }

        public string? ShortsLength { get; set; }

        public string? FootType { get; set; }

    }

    internal class UpsertFitPreferencesValidator : AbstractValidator<UpsertFitPreferences>
    {
        public UpsertFitPreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class UpsertFitPreferencesHandler : IRequestHandler<UpsertFitPreferences, FitPreferencesDTO>
    {
        private readonly IFitPreferencesRepository _fitPreferencesRepository;
        private readonly IAccountRepository _accountRepository;

        public UpsertFitPreferencesHandler(IFitPreferencesRepository fitPreferencesRepository, IAccountRepository accountRepository)
        {
            _fitPreferencesRepository = fitPreferencesRepository;
            _accountRepository = accountRepository;
        }

        public async Task<FitPreferencesDTO> Handle(UpsertFitPreferences request, CancellationToken cancellationToken)
        {
            FitPreferences? fitPreferences = await _fitPreferencesRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (fitPreferences == null)
            {
                fitPreferences = new FitPreferences(
                    request.AccountId,
                    request.WaistHeight,
                    request.UpperFit,
                    request.LowerFit,
                    request.LegFit,
                    request.SkirtDressLength,
                    request.ShortsLength,
                    request.FootType);

                await _fitPreferencesRepository.AddAsync(fitPreferences, cancellationToken);

                Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

                if (account == null)
                {
                    throw new AccountNotFoundInternalException(request.AccountId);
                }

                account.SetFitPreferences(fitPreferences.Id);

                await _accountRepository.UpdateAsync(account, cancellationToken);
            }
            else
            {
                fitPreferences.Update(
                    request.WaistHeight,
                    request.UpperFit,
                    request.LowerFit,
                    request.LegFit,
                    request.SkirtDressLength,
                    request.ShortsLength,
                    request.FootType);

                await _fitPreferencesRepository.UpdateAsync(fitPreferences, cancellationToken);
            }

            return fitPreferences.Adapt<FitPreferencesDTO>();
        }
    }
}
