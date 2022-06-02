
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class UpsertSizeInfo : IRequest<SizeInfoDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public Gender Gender { get; set; }

        public string Tshirt { get; set; }

        public string Sweater { get; set; }

        public string Sweatshirt { get; set; }

        public string Crop { get; set; }

        public string Blouse { get; set; }

        public string Shirt { get; set; }

        public string SleevelessUnderShirt { get; set; }

        public string Bustier { get; set; }

        public string Bralet { get; set; }

        public string Tunik { get; set; }

        public string Dress { get; set; }

        public string Overalls { get; set; }

        public string Pants { get; set; }

        public string Jeans { get; set; }

        public string Skirt { get; set; }

        public string Shorts { get; set; }

        public string Leggings { get; set; }

        public string Sweatpants { get; set; }

        public int Weight { get; set; }

        public int Height { get; set; }

        public int NeckRadius { get; set; }

        public int BreastRadius { get; set; }

        public int WaistRadius { get; set; }

        public int HipRadius { get; set; }

        public int LegLength { get; set; }
    }

    internal class UpsertSizeInfoValidator : AbstractValidator<UpsertSizeInfo>
    {
        public UpsertSizeInfoValidator()
        {
            RuleFor(x => x.Gender).IsInEnum().NotEqual(Gender.None);

            RuleFor(x => x.Tshirt).NotEmpty();

            RuleFor(x => x.Sweater).NotEmpty();

            RuleFor(x => x.Sweatshirt).NotEmpty();

            RuleFor(x => x.Crop).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Blouse).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Shirt).NotEmpty();

            RuleFor(x => x.SleevelessUnderShirt).NotEmpty();

            RuleFor(x => x.Bustier).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Bralet).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Tunik).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Dress).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Overalls).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Pants).NotEmpty();

            RuleFor(x => x.Jeans).NotEmpty();

            RuleFor(x => x.Skirt).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Shorts).NotEmpty();

            RuleFor(x => x.Leggings).NotEmpty()
                .When(x => x.Gender == Gender.Female);

            RuleFor(x => x.Sweatpants).NotEmpty();
        }
    }

    internal class UpsertSizeInfoHandler : IRequestHandler<UpsertSizeInfo, SizeInfoDTO>
    {
        private readonly ISizeInfoRepository _sizeInfoRepository;
        private readonly IAccountRepository _accountRepository;

        public UpsertSizeInfoHandler(ISizeInfoRepository sizeInfoRepository, IAccountRepository accountRepository)
        {
            _sizeInfoRepository = sizeInfoRepository;
            _accountRepository = accountRepository;
        }

        public async Task<SizeInfoDTO> Handle(UpsertSizeInfo request, CancellationToken cancellationToken)
        {
            SizeInfo? sizeInfo = await _sizeInfoRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (sizeInfo == null)
            {
                sizeInfo = new SizeInfo(
                    request.AccountId,
                    request.Tshirt,
                    request.Sweater,
                    request.Sweatshirt,
                    request.Crop,
                    request.Blouse,
                    request.Shirt,
                    request.SleevelessUnderShirt,
                    request.Bustier,
                    request.Bralet,
                    request.Tunik,
                    request.Dress,
                    request.Overalls,
                    request.Pants,
                    request.Jeans,
                    request.Skirt,
                    request.Shorts,
                    request.Leggings,
                    request.Sweatpants,
                    request.Weight,
                    request.Height,
                    request.NeckRadius,
                    request.BreastRadius,
                    request.WaistRadius,
                    request.HipRadius,
                    request.LegLength);

                await _sizeInfoRepository.AddAsync(sizeInfo, cancellationToken);

                Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

                if (account == null)
                {
                    throw new AccountNotFoundInternalException(request.AccountId);
                }

                account.SetSizeInfo(sizeInfo.Id);

                await _accountRepository.UpdateAsync(account, cancellationToken);
            }
            else
            {
                sizeInfo.Update(
                    request.Weight,
                    request.Height,
                    request.NeckRadius,
                    request.BreastRadius,
                    request.WaistRadius,
                    request.HipRadius,
                    request.LegLength,
                    request.Tshirt,
                    request.Sweater,
                    request.Sweatshirt,
                    request.Crop,
                    request.Blouse,
                    request.Shirt,
                    request.SleevelessUnderShirt,
                    request.Bustier,
                    request.Bralet,
                    request.Tunik,
                    request.Dress,
                    request.Overalls,
                    request.Pants,
                    request.Jeans,
                    request.Skirt,
                    request.Shorts,
                    request.Leggings,
                    request.Sweatpants);

                await _sizeInfoRepository.UpdateAsync(sizeInfo, cancellationToken);
            }

            return sizeInfo.Adapt<SizeInfoDTO>();
        }
    }
}
