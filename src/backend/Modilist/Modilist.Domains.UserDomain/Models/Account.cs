
using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Domains.UserDomain.Models
{
    public class Account : BaseEntity
    {
        public Account(Guid id,
            string email,
            string? firstName = null,
            string? lastName = null,
            DateTime? birthDate = null,
            Gender gender = Gender.None,
            string? instagramUserName = null,
            string? phone = null,
            string? jobTitle = null)
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
            Status = AccountStatus.Active;
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

        public void Update(string firstName,
                       string lastName,
                       DateTime? birthDate,
                       Gender gender,
                       string instagramUserName,
                       string phone,
                       string jobTitle)
        {
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
            Gender = gender;
            InstagramUserName = instagramUserName;
            Phone = phone;
            JobTitle = jobTitle;
        }
    }
}
