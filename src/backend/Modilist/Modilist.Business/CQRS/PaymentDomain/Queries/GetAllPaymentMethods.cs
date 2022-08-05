
using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;

using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Data.Repositories.PaymentDomain;

namespace Modilist.Business.CQRS.PaymentDomain.Queries
{
    public class GetAllPaymentMethods : IRequest<IEnumerable<PaymentMethodDTO>>
    {
        public Guid AccountId { get; set; }
    }

    internal class GetAllPaymentMethodsValidator : AbstractValidator<GetAllPaymentMethods>
    {
        public GetAllPaymentMethodsValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetAllPaymentMethodsHandler : IRequestHandler<GetAllPaymentMethods, IEnumerable<PaymentMethodDTO>>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public GetAllPaymentMethodsHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<IEnumerable<PaymentMethodDTO>> Handle(GetAllPaymentMethods request, CancellationToken cancellationToken)
        {
            return await _paymentMethodRepository.GetAll().Where(x => x.AccountId == request.AccountId).ProjectToType<PaymentMethodDTO>().ToListAsync(cancellationToken);
        }
    }
}
