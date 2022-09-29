using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using Modilist.Business.CQRS.UserDomain.DTOs;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Infrastructure.Shared.Configurations;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class SendNewAccountNotification : IRequest
    {
        public Guid AccountId { get; set; }
    }

    internal class SendNewAccountNotificationValidator : AbstractValidator<SendNewAccountNotification>
    {
        public SendNewAccountNotificationValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class SendNewAccountNotificationHandler : IRequestHandler<SendNewAccountNotification>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly LogicAppUrls _logicAppUrls;

        public SendNewAccountNotificationHandler(IAccountRepository accountRepository, IHttpClientFactory httpClientFactory, IOptions<LogicAppUrls> logicAppUrls)
        {
            _accountRepository = accountRepository;
            _httpClientFactory = httpClientFactory;
            _logicAppUrls = logicAppUrls.Value;
        }

        public async Task<Unit> Handle(SendNewAccountNotification request, CancellationToken cancellationToken)
        {
            var result = await _accountRepository.GetAll()
                .ProjectToType<NewAccountNotificationDTO>()
                .FirstOrDefaultAsync(x => x.Id == request.AccountId, cancellationToken);

            if (result == null)
            {
                return Unit.Value;
            }

            using (var httpClient = _httpClientFactory.CreateClient())
            {
                var jsonSettings = new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                };
                jsonSettings.Converters.Add(new StringEnumConverter());

                var requestBody = JsonConvert.SerializeObject(result, jsonSettings);

                await httpClient.PostAsync(_logicAppUrls.NewAccountNotificationHandler, new StringContent(requestBody, Encoding.UTF8, "application/json"), cancellationToken);
            }

            return Unit.Value;
        }
    }
}
