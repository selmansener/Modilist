
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Domains.Models.PaymentDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.PaymentDomain.Commands
{
    public class CreatePaymentMethod : IRequest<PaymentMethodDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string CardUserKey { get; set; }

        public bool IsDefault { get; set; }
    }

    internal class CreatePaymentMethodValidator : AbstractValidator<CreatePaymentMethod>
    {
        public CreatePaymentMethodValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.CardUserKey).NotEmpty();
        }
    }

    internal class CreatePaymentMethodHandler : IRequestHandler<CreatePaymentMethod, PaymentMethodDTO>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public CreatePaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<PaymentMethodDTO> Handle(CreatePaymentMethod request, CancellationToken cancellationToken)
        {
            PaymentMethod? paymentMethod = await _paymentMethodRepository.GetByCardKey(request.AccountId, request.CardUserKey, cancellationToken);

            if (paymentMethod != null)
            {
                // TODO: change exception type

                throw new Exception("This card already defined for this account");
            }

            paymentMethod = new PaymentMethod(request.AccountId, request.CardUserKey, request.IsDefault);

            if (request.IsDefault)
            {
                var defaultPaymentMethod = await _paymentMethodRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

                if (defaultPaymentMethod != null)
                {
                    defaultPaymentMethod.ChangeDefault(false);

                    await _paymentMethodRepository.UpdateAsync(defaultPaymentMethod, cancellationToken);
                }
            }

            await _paymentMethodRepository.AddAsync(paymentMethod, cancellationToken);

            return paymentMethod.Adapt<PaymentMethodDTO>();
        }
    }
}
