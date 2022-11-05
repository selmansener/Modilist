
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.StylePreferencesDomain;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces.Enums;
using Modilist.Data.Repositories.DiscountsDomain;
using Modilist.Domains.Models.DiscountsDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class UpsertSizeInfo : IRequest<SizeInfoDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public Gender Gender { get; set; }

        public BodyType BodyType { get; set; }

        public string UpperBody { get; set; }

        public string LowerBody { get; set; }

        public string WomenUnderWearCup { get; set; }

        public string WomenUnderWearSize { get; set; }

        public string MenUnderWear { get; set; }

        public string OutWear { get; set; }

        public string FootWear { get; set; }

        public string AdditionalNotes { get; set; }

        public int Weight { get; set; }

        public int Height { get; set; }

        public int? ShoulderWidth { get; set; }
        
        public int? HeadRadius { get; set; }
        
        public int? ArmLength { get; set; }
        
        public int? BodyLength { get; set; }
        
        public int? NeckRadius { get; set; }
        
        public int? BreastRadius { get; set; }
        
        public int? WaistRadius { get; set; }
        
        public int? HipRadius { get; set; }
        
        public int? LegLength { get; set; }
        
        public int? FootLength { get; set; }
    }

    internal class UpsertSizeInfoValidator : AbstractValidator<UpsertSizeInfo>
    {
        public UpsertSizeInfoValidator()
        {
            RuleFor(x => x.Gender).IsInEnum().NotEqual(Gender.None);
            RuleFor(x => x.BodyType).IsInEnum().NotEqual(BodyType.None);
            RuleFor(x => x.UpperBody).NotEmpty();
            RuleFor(x => x.LowerBody).NotEmpty();
            RuleFor(x => x.OutWear).NotEmpty();
            RuleFor(x => x.FootWear).NotEmpty();
            RuleFor(x => x.WomenUnderWearCup).NotEmpty().When(x => x.Gender == Gender.Female);
            RuleFor(x => x.WomenUnderWearSize).NotEmpty().When(x => x.Gender == Gender.Female);
            RuleFor(x => x.MenUnderWear).NotEmpty().When(x => x.Gender == Gender.Male);
            RuleFor(x => x.Weight).NotEmpty();
            RuleFor(x => x.Height).NotEmpty();
            RuleFor(x => x.AdditionalNotes).MaximumLength(4000);
        }
    }

    internal class UpsertSizeInfoHandler : IRequestHandler<UpsertSizeInfo, SizeInfoDTO>
    {
        private readonly ISizeInfoRepository _sizeInfoRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IDiscountsRepository _discountsRepository;

        public UpsertSizeInfoHandler(ISizeInfoRepository sizeInfoRepository, IAccountRepository accountRepository, IDiscountsRepository discountsRepository)
        {
            _sizeInfoRepository = sizeInfoRepository;
            _accountRepository = accountRepository;
            _discountsRepository = discountsRepository;
        }

        public async Task<SizeInfoDTO> Handle(UpsertSizeInfo request, CancellationToken cancellationToken)
        {
            SizeInfo? sizeInfo = await _sizeInfoRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (sizeInfo == null)
            {
                sizeInfo = new SizeInfo(
                    request.AccountId,
                    request.BodyType,
                    request.Weight,
                    request.Height,
                    request.ShoulderWidth,
                    request.HeadRadius,
                    request.ArmLength,
                    request.BodyLength,
                    request.NeckRadius,
                    request.BreastRadius,
                    request.WaistRadius,
                    request.HipRadius,
                    request.LegLength,
                    request.FootLength,
                    request.UpperBody,
                    request.LowerBody,
                    request.WomenUnderWearCup,
                    request.WomenUnderWearSize,
                    request.MenUnderWear,
                    request.OutWear,
                    request.FootWear,
                    request.AdditionalNotes);

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
                    request.BodyType,
                    request.Weight,
                    request.Height,
                    request.ShoulderWidth,
                    request.HeadRadius,
                    request.ArmLength,
                    request.BodyLength,
                    request.NeckRadius,
                    request.BreastRadius,
                    request.WaistRadius,
                    request.HipRadius,
                    request.LegLength,
                    request.FootLength,
                    request.UpperBody,
                    request.LowerBody,
                    request.WomenUnderWearCup,
                    request.WomenUnderWearSize,
                    request.MenUnderWear,
                    request.OutWear,
                    request.FootWear,
                    request.AdditionalNotes);

                

                await _sizeInfoRepository.UpdateAsync(sizeInfo, cancellationToken);
            }

            if (sizeInfo.DoesBodySizeProvided())
            {
                var doesBodySizeDiscountExists = await _discountsRepository.DoesBodySizeDiscountExists(request.AccountId, cancellationToken);

                if (!doesBodySizeDiscountExists)
                {
                    ExclusiveDiscount bodySizeDiscount = new ExclusiveDiscount(request.AccountId, Currency.TRY, DiscountType.BodySizeDiscount);

                    bodySizeDiscount.Activate();

                    await _discountsRepository.AddAsync(bodySizeDiscount, cancellationToken);
                }
            }

            return sizeInfo.Adapt<SizeInfoDTO>();
        }
    }
}
