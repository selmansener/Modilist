
using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Domains.UserDomain.Models
{
    public class Account : BaseEntity
    {
        public Account(Guid id,
                       string firstName,
                       string lastName,
                       DateTime birthDate,
                       Gender gender,
                       string instagramUserName,
                       string email,
                       string phone,
                       string jobTitle,
                       AccountStatus status)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
            Gender = gender;
            InstagramUserName = instagramUserName;
            Email = email;
            Phone = phone;
            JobTitle = jobTitle;
            Status = status;
        }

        public new Guid Id { get; private set; }

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public DateTime? BirthDate { get; private set; }

        public Gender Gender { get; private set; }

        public string? InstagramUserName { get; private set; }

        public string? Email { get; private set; }

        public string? Phone { get; private set; }

        public string? JobTitle { get; private set; }

        public AccountStatus Status { get; private set; }
    }
}
