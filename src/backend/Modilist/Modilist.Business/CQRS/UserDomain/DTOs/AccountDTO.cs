
using Mapster;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.UserDomain.DTOs
{
    public class AccountDTO
    {
        public Guid Id { get; private set; }

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public DateTime? BirthDate { get; private set; }

        public Gender Gender { get; private set; }

        public string? InstagramUserName { get; private set; }

        public string? Email { get; private set; }

        public string? Phone { get; private set; }

        public string? JobTitle { get; private set; }

        public AccountStatus State { get; private set; }
    }

    public class AccountDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Account, AccountDTO>();
        }
    }
}
