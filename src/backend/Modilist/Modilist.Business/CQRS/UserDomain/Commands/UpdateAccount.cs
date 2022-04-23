using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.UserDomain.Commands.DTOs;
using Modilist.Data.Repositories.UserDomain;
using Modilist.Domains.UserDomain.Models;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.UserDomain.Commands
{
    public class UpdateAccount : IRequest<UpdateAccountOutputDTO>
    {
        public Guid Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime? BirthDate { get; set; }

        public Gender Gender { get; set; } = Gender.None;

        public string? InstagramUserName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? JobTitle { get; set; }
    }

    public class UpdateAccountHandler : IRequestHandler<UpdateAccount, UpdateAccountOutputDTO>
    {
        private readonly IAccountWriteRepository _accountWriteRepository;

        public UpdateAccountHandler(IAccountWriteRepository accountWriteRepository)
        {
            _accountWriteRepository = accountWriteRepository;
        }

        public async Task<UpdateAccountOutputDTO> Handle(UpdateAccount request, CancellationToken cancellationToken)
        {
            Account account = await _accountWriteRepository.GetByIdAsync(request.Id, cancellationToken);

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
                request.Email,
                request.Phone,
                request.JobTitle);

            await _accountWriteRepository.UpdateAsync(account, cancellationToken, true);

            return account.Adapt<UpdateAccountOutputDTO>();
        }
    }
}
