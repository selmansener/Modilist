using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Domains.PaymentDomain.Models;

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
        private readonly IPaymentMethodWriteRepository _paymentMethodWriteRepository;

        public CreatePaymentMethodHandler(IPaymentMethodWriteRepository paymentMethodWriteRepository)
        {
            _paymentMethodWriteRepository = paymentMethodWriteRepository;
        }

        public async Task<PaymentMethodDTO> Handle(CreatePaymentMethod request, CancellationToken cancellationToken)
        {
            PaymentMethod? paymentMethod = await _paymentMethodWriteRepository.GetByCardKey(request.AccountId, request.CardUserKey, cancellationToken);

            if (paymentMethod != null)
            {
                // TODO: change exception type

                throw new Exception("This card already defined for this account");
            }

            paymentMethod = new PaymentMethod(request.AccountId, request.CardUserKey, request.IsDefault);

            if (request.IsDefault)
            {
                var defaultPaymentMethod = await _paymentMethodWriteRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

                if (defaultPaymentMethod != null)
                {
                    defaultPaymentMethod.ChangeDefault(false);

                    await _paymentMethodWriteRepository.UpdateAsync(defaultPaymentMethod, cancellationToken);
                }
            }

            await _paymentMethodWriteRepository.AddAsync(paymentMethod, cancellationToken);

            return paymentMethod.Adapt<PaymentMethodDTO>();
        }
    }
}
