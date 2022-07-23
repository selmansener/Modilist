
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Business.CQRS.PaymentDomain.Queries
{
    public class GetDefaultPaymentMethod : IRequest<PaymentMethodDTO>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetDefaultPaymentMethodValidator : AbstractValidator<GetDefaultPaymentMethod>
    {
        public GetDefaultPaymentMethodValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetDefaultPaymentMethodHandler : IRequestHandler<GetDefaultPaymentMethod, PaymentMethodDTO>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public GetDefaultPaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<PaymentMethodDTO> Handle(GetDefaultPaymentMethod request, CancellationToken cancellationToken)
        {
            PaymentMethod? defaultPaymentMethod = await _paymentMethodRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (defaultPaymentMethod == null)
            {
                throw new DefaultPaymentMethodNotFoundException(request.AccountId);
            }

            return defaultPaymentMethod.Adapt<PaymentMethodDTO>();
        }
    }
}
