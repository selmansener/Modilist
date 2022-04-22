using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MediatR;

using Modilist.Business.CQRS.UserDomain.Commands.DTOs;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.UserDomain.Models;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class CreateAccount : IRequest<CreateAccountOutputDTO>
    {
        public Guid Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime? BirthDate { get; set; }

        public Gender Gender { get; set; }

        public string? InstagramUserName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? JobTitle { get; set; }
    }

    internal class CreateAccountHandler : IRequestHandler<CreateAccount, CreateAccountOutputDTO>
    {
        private readonly IAccountWriteRepository _accountWriteRepository;

        public CreateAccountHandler(IAccountWriteRepository accountWriteRepository)
        {
            _accountWriteRepository = accountWriteRepository;
        }

        public async Task<CreateAccountOutputDTO> Handle(CreateAccount request, CancellationToken cancellationToken)
        {
            Account account = new Account(request.Id,
                                          request.FirstName,
                                          request.LastName,
                                          request.BirthDate,
                                          request.Gender,
                                          request.InstagramUserName,
                                          request.Email,
                                          request.Phone,
                                          request.JobTitle,
                                          Infrastructure.Shared.Enums.AccountStatus.Active);

            await _accountWriteRepository.AddAsync(account, cancellationToken);

            return null;
        }
    }
}
