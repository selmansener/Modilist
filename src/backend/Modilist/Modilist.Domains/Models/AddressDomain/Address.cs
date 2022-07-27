
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.AddressDomain
{
    public class Address : BaseEntity
    {
        protected Address() { }

        public Address(
            Guid accountId,
            string name,
            string firstName,
            string lastName,
            string phone,
            string city,
            string district,
            string fullAddress,
            bool isDefault,
            string? zipCode = null)
        {
            AccountId = accountId;
            Name = name;
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            ZipCode = zipCode;
            City = city;
            District = district;
            FullAddress = fullAddress;
            IsDefault = isDefault;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string Name { get; private set; }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Phone { get; private set; }

        public string? ZipCode { get; private set; }

        public string City { get; private set; }

        public string District { get; private set; }

        public string FullAddress { get; private set; }

        public bool IsDefault { get; private set; }

        public void ChangeDefault(bool isDefault)
        {
            IsDefault = isDefault;
        }

        public void UpdateAddress(
            string firstName,
            string lastName,
            string phone,
            string zipCode,
            string city,
            string district,
            string fullAddress,
            bool isDefault)
        {
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            ZipCode = zipCode;
            City = city;
            District = district;
            FullAddress = fullAddress;
            IsDefault = isDefault;
        }
    }
}
