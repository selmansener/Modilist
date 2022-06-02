
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Domains.Models.StylePreferencesDomain;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Queries
{
    public class GetSizeInfo : IRequest<SizeInfoDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetSizeInfoValidator : AbstractValidator<GetSizeInfo>
    {
        public GetSizeInfoValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetSizeInfoHandler : IRequestHandler<GetSizeInfo, SizeInfoDTO>
    {
        private readonly ISizeInfoRepository _sizeInfoRepository;

        public GetSizeInfoHandler(ISizeInfoRepository sizeInfoRepository)
        {
            _sizeInfoRepository = sizeInfoRepository;
        }

        public async Task<SizeInfoDTO> Handle(GetSizeInfo request, CancellationToken cancellationToken)
        {
            SizeInfo? sizeInfo = await _sizeInfoRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (sizeInfo == null)
            {
                throw new SizeInfoNotFoundException(request.AccountId);
            }

            return sizeInfo.Adapt<SizeInfoDTO>();
        }
    }
}
