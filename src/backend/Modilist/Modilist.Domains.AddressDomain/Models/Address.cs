using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Domains.AddressDomain.Models
{
    public class Address : BaseEntity
    {
        public Address(
            Guid accountId,
            string name,
            string firstName,
            string lastName,
            string phone,
            string zipCode,
            string city,
            string district,
            string fullAddress,
            bool isDefault)
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

        public string ZipCode { get; private set; }

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
