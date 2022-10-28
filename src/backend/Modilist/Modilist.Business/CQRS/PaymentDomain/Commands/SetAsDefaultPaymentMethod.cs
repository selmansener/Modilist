using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Domains.Models.PaymentDomain;

namespace Modilist.Business.CQRS.PaymentDomain.Commands
{
    public class SetAsDefaultPaymentMethod : IRequest
    {
        public Guid AccountId { get; set; }

        public string CardName { get; set; }
    }

    internal class SetAsDefaultPaymentMethodValidator : AbstractValidator<SetAsDefaultPaymentMethod>
    {
        public SetAsDefaultPaymentMethodValidator()
        {
            RuleFor(c => c.AccountId).NotEmpty();
            RuleFor(c => c.CardName).NotEmpty();
        }
    }

    internal class SetAsDefaultPaymentMethodHandler : IRequestHandler<SetAsDefaultPaymentMethod>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public SetAsDefaultPaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<Unit> Handle(SetAsDefaultPaymentMethod request, CancellationToken cancellationToken)
        {
            PaymentMethod? currentDefaultPaymentMethod = await _paymentMethodRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if(currentDefaultPaymentMethod != null)
            {
                currentDefaultPaymentMethod.ChangeDefault(false);

                await _paymentMethodRepository.UpdateAsync(currentDefaultPaymentMethod, cancellationToken);
            }

            PaymentMethod? paymentMethod = await _paymentMethodRepository.GetByNameAsync(request.CardName, request.AccountId, cancellationToken);

            if(paymentMethod == null)
            {
                throw new PaymentMethodNotFoundException(request.AccountId, request.CardName);
            }

            paymentMethod.ChangeDefault(true);

            await _paymentMethodRepository.UpdateAsync(paymentMethod, cancellationToken);

            return Unit.Value;
        }
    }

}
