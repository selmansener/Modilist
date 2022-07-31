
using Modilist.Domains.Base;

namespace Modilist.Domains.Models.SalesOrderDomain
{
    public class SalesOrderAddress : BaseEntity
    {
        protected SalesOrderAddress() { }

        public SalesOrderAddress(
            int salesOrderId,
            string name,
            string firstName,
            string lastName,
            string phone,
            string city,
            string district,
            string fullAddress,
            string zipCode = null)
        {
            SalesOrderId = salesOrderId;
            Name = name;
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            ZipCode = zipCode;
            City = city;
            District = district;
            FullAddress = fullAddress;
            Country = "Turkey";
        }

        public int SalesOrderId { get; set; }

        public SalesOrder SalesOrder { get; set; }

        public string Name { get; private set; }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Phone { get; private set; }

        public string? ZipCode { get; private set; }

        public string Country { get; private set; }

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
