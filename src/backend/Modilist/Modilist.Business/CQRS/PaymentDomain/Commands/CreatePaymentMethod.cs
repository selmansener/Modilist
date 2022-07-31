
using FluentValidation;

using Iyzipay.Model;
using Iyzipay.Request;

using Mapster;

using MediatR;

using Microsoft.Extensions.Options;

using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.PaymentDomain;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Domains.Models.PaymentDomain;
using Modilist.Infrastructure.Shared.Configurations;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.PaymentDomain.Commands
{
    public class CreatePaymentMethod : IRequest<PaymentMethodDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string CardNumber { get; set; }

        public string CardHolderName { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }

        public string CVC { get; set; }

        public bool IsDefault { get; set; }
    }

    internal class CreatePaymentMethodValidator : AbstractValidator<CreatePaymentMethod>
    {
        public CreatePaymentMethodValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.CardNumber).NotEmpty();
            RuleFor(x => x.CardHolderName).NotEmpty();
            RuleFor(x => x.ExpireMonth).NotEmpty();
            RuleFor(x => x.ExpireYear).NotEmpty();
            RuleFor(x => x.CVC).NotEmpty();
        }
    }

    internal class CreatePaymentMethodHandler : IRequestHandler<CreatePaymentMethod, PaymentMethodDTO>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public CreatePaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository, IAccountRepository accountRepository, IOptions<IyzicoAPIOptions> options)
        {
            _paymentMethodRepository = paymentMethodRepository;
            _accountRepository = accountRepository;
            _iyzicoAPIOptions = options.Value;
        }

        public async Task<PaymentMethodDTO> Handle(CreatePaymentMethod request, CancellationToken cancellationToken)
        {
            PaymentMethod? paymentMethod = await _paymentMethodRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (paymentMethod == null)
            {
                paymentMethod = new PaymentMethod(request.AccountId, request.IsDefault);

                await _paymentMethodRepository.AddAsync(paymentMethod, cancellationToken, true);
            }

            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            CreateCardRequest cardRequest = new CreateCardRequest
            {
                Locale = Locale.TR.ToString(),
                ConversationId = Guid.NewGuid().ToString(),
                Email = account.Email,
                ExternalId = paymentMethod.Id.ToString(),
            };

            CardInformation cardInformation = new CardInformation
            {
                CardAlias = account.Email,
                CardHolderName = request.CardHolderName,
                CardNumber = request.CardNumber.Replace(" ", string.Empty),
                ExpireMonth = request.ExpireMonth,
                ExpireYear = request.ExpireYear,
            };

            cardRequest.Card = cardInformation;

            Card card = Card.Create(cardRequest, new Iyzipay.Options 
            {
                ApiKey = _iyzicoAPIOptions.APIKey,
                BaseUrl = _iyzicoAPIOptions.BaseUrl,
                SecretKey = _iyzicoAPIOptions.SecretKey
            });

            if (card.Status == "success")
            {
                if (card.ConversationId != cardRequest.ConversationId)
                {
                    // TODO: we might be hacked!!!
                    throw new InvalidOperationException("create card request failed");
                }

                var lastFourDigit = request.CardNumber.Substring(request.CardNumber.Length - 4, 4);

                paymentMethod.UpdateCardInfo(card.CardUserKey, card.CardToken, card.CardAssociation, card.CardFamily, card.CardBankName, card.CardBankCode, lastFourDigit, request.CVC);

                await _paymentMethodRepository.UpdateAsync(paymentMethod, cancellationToken);
            }
            else
            {
                // TODO: check card.errorCode and card.errorMessage and throw proper exception with 

                throw new InvalidOperationException("create card request failed");
            }

            return paymentMethod.Adapt<PaymentMethodDTO>();
        }
    }
}
