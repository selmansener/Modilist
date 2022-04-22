using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mapster;

using Modilist.Domains.UserDomain.Models;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.UserDomain.Commands.DTOs
{
    public class CreateAccountOutputDTO
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

    public class CreateAccountOutputDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Account, CreateAccountOutputDTO>();
        }
    }
}
