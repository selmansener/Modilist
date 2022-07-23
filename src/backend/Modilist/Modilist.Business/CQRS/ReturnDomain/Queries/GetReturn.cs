
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.ReturnDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.ReturnDomain;
using Modilist.Domains.Models.ReturnDomain;

namespace Modilist.Business.CQRS.ReturnDomain.Queries
{
    public class GetReturn : IRequest<ReturnDTO>
    {
        public Guid AccountId { get; set; }

        public int SalesOrderId { get; set; }
    }

    internal class GetReturnValidator : AbstractValidator<GetReturn>
    {
        public GetReturnValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.SalesOrderId).NotEmpty();
        }
    }

    internal class GetReturnHandler : IRequestHandler<GetReturn, ReturnDTO>
    {
        private readonly IReturnRepository _returnRepository;

        public GetReturnHandler(IReturnRepository returnRepository)
        {
            _returnRepository = returnRepository;
        }

        public async Task<ReturnDTO> Handle(GetReturn request, CancellationToken cancellationToken)
        {
            Return? @return = await _returnRepository.GetBySalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);

            if (@return == null)
            {
                throw new ReturnNotFoundException(request.AccountId, request.SalesOrderId);
            }

            return @return.Adapt<ReturnDTO>();
        }
    }
}
