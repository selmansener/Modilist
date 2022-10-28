
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
    public class CreateNewPaymentMethod : IRequest<PaymentMethodDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string CardName { get; set; }

        public string CardNumber { get; set; }

        public string CardHolderName { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }

        public bool IsDefault { get; set; }
    }

    internal class CreateNewPaymentMethodValidator : AbstractValidator<CreateNewPaymentMethod>
    {
        public CreateNewPaymentMethodValidator()
        {
            RuleFor(x => x.CardName).NotEmpty();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.CardNumber).NotEmpty();
            RuleFor(x => x.CardHolderName).NotEmpty();
            RuleFor(x => x.ExpireMonth).NotEmpty();
            RuleFor(x => x.ExpireYear).NotEmpty();
        }
    }

    internal class CreateNewPaymentMethodHandler : IRequestHandler<CreateNewPaymentMethod, PaymentMethodDTO>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public CreateNewPaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository, IAccountRepository accountRepository, IOptions<IyzicoAPIOptions> options)
        {
            _paymentMethodRepository = paymentMethodRepository;
            _accountRepository = accountRepository;
            _iyzicoAPIOptions = options.Value;
        }

        public async Task<PaymentMethodDTO> Handle(CreateNewPaymentMethod request, CancellationToken cancellationToken)
        {

            var doesCardNameExist = await _paymentMethodRepository.DoesCardNameExist(request.CardName, request.AccountId, cancellationToken);

            if(doesCardNameExist)
            {
                throw new PaymentMethodAlreadyExistsException(request.AccountId, request.CardName);
            }

            PaymentMethod? paymentMethodDefault = await _paymentMethodRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if(request.IsDefault == true && paymentMethodDefault != null)
            {
                paymentMethodDefault.ChangeDefault(false);

                await _paymentMethodRepository.UpdateAsync(paymentMethodDefault, cancellationToken);
            }
            
            PaymentMethod? paymentMethodNew = new PaymentMethod(request.AccountId, request.IsDefault);

            await _paymentMethodRepository.AddAsync(paymentMethodNew, cancellationToken, true);
            

            Account? account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            CreateCardRequest cardRequest = new CreateCardRequest
            {
                Locale = Locale.TR.ToString(),
                ConversationId = request.AccountId.ToString(),
                Email = account.Email,
                ExternalId = $"{paymentMethodNew.AccountId.ToString()}/{paymentMethodNew.CardName}",
                CardUserKey = paymentMethodDefault.CardUserKey
            };

            CardInformation cardInformation = new CardInformation
            {
                CardAlias = request.CardName,
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
                    throw new ConversationIdFailureException(request.AccountId, cardRequest.ConversationId, card.ConversationId);
                }

                paymentMethodNew.UpdateCardInfo(
                    card.CardUserKey,
                    card.CardToken,
                    card.CardAssociation,
                    card.CardFamily,
                    card.CardBankName,
                    card.CardBankCode,
                    card.BinNumber,
                    request.CardName);

                await _paymentMethodRepository.UpdateAsync(paymentMethodNew, cancellationToken);
            }
            else
            {
                // TODO: check card.errorCode and card.errorMessage and throw proper exception with 

                throw new InvalidOperationException($"create card request failed with error code: {card.ErrorCode} and message: {card.ErrorMessage}");
            }

            return paymentMethodNew.Adapt<PaymentMethodDTO>();
        }
    }
}
