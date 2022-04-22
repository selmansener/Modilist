using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.UserDomain.Commands.DTOs
{
    public class CreateAccountInputDTO
    {
        public new Guid Id { get; private set; }

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public DateTime? BirthDate { get; private set; }

        public Gender Gender { get; private set; }

        public string? InstagramUserName { get; private set; }

        public string? Email { get; private set; }

        public string? Phone { get; private set; }

        public string? JobTitle { get; private set; }
    }
}
