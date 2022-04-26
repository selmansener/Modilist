
using FluentValidation;

using MediatR;

using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class CreateAccount : IRequest
    {
        public CreateAccount(Guid id, string email)
        {
            Id = id;
            Email = email;
        }

        public Guid Id { get; set; }

        public string Email { get; set; }
    }

    internal class CreateAccountValidator : AbstractValidator<CreateAccount>
    {
        public CreateAccountValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
        }
    }

    internal class CreateAccountHandler : IRequestHandler<CreateAccount>
    {
        private readonly IAccountWriteRepository _accountWriteRepository;

        public CreateAccountHandler(IAccountWriteRepository accountWriteRepository)
        {
            _accountWriteRepository = accountWriteRepository;
        }

        public async Task<Unit> Handle(CreateAccount request, CancellationToken cancellationToken)
        {
            Account account = await _accountWriteRepository.GetByIdAsync(request.Id, cancellationToken);

            if (account != null)
            {
                // TODO: change to client exception
                throw new Exception("account already exists");
            }

            account = new Account(request.Id, request.Email);

            await _accountWriteRepository.AddAsync(account, cancellationToken, true);

            return Unit.Value;
        }
    }
}
