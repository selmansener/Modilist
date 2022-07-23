using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;

namespace Modilist.Domains.Models.ReturnDomain
{
    public class ReturnAddress : BaseEntity
    {
        public ReturnAddress(
            int returnId,
            string name,
            string firstName,
            string lastName,
            string phone,
            string city,
            string district,
            string fullAddress,
            string? zipCode = null)
        {
            ReturnId = returnId;
            Name = name;
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            ZipCode = zipCode;
            City = city;
            District = district;
            FullAddress = fullAddress;
        }

        public int ReturnId { get; set; }

        public Return Return { get; set; }

        public string Name { get; private set; }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Phone { get; private set; }

        public string? ZipCode { get; private set; }

        public string City { get; private set; }

        public string District { get; private set; }

        public string FullAddress { get; private set; }

        internal void UpdateAddress(
            string name,
            string firstName,
            string lastName,
            string phone,
            string city,
            string district,
            string fullAddress,
            string zipCode = null)
        {
            Name = name;
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            ZipCode = zipCode;
            City = city;
            District = district;
            FullAddress = fullAddress;
        }
    }
}
