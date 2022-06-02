
using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.UserDomain.DTOs;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class UpdateAccount : IRequest<AccountDTO>
    {
        [JsonIgnore]
        public Guid? Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime? BirthDate { get; set; }

        public Gender Gender { get; set; }

        public string? InstagramUserName { get; set; }

        public string? Phone { get; set; }

        public string? JobTitle { get; set; }
    }

    internal class UpdateAccountValidator : AbstractValidator<UpdateAccount>
    {
        public UpdateAccountValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Gender).IsInEnum().NotEqual(Gender.None).WithErrorCode("GenderIsRequired");
        }
    }

    internal class UpdateAccountHandler : IRequestHandler<UpdateAccount, AccountDTO>
    {
        private readonly IAccountRepository _accountWriteRepository;

        public UpdateAccountHandler(IAccountRepository accountWriteRepository)
        {
            _accountWriteRepository = accountWriteRepository;
        }

        public async Task<AccountDTO> Handle(UpdateAccount request, CancellationToken cancellationToken)
        {
            Account? account = await _accountWriteRepository.GetByIdAsync(request.Id.Value, cancellationToken);

            // TODO: change exception type
            if (account == null)
            {
                throw new Exception("account not found");
            }

            account.Update(request.FirstName,
                request.LastName,
                request.BirthDate,
                request.Gender,
                request.InstagramUserName,
                request.Phone,
                request.JobTitle);

            await _accountWriteRepository.UpdateAsync(account, cancellationToken, true);

            return account.Adapt<AccountDTO>();
        }
    }
}
