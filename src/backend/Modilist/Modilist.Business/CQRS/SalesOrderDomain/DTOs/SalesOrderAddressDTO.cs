namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class SalesOrderAddressDTO
    {
        public string Name { get; private set; }

        public string FirstName { get; private set; }

        public string LastName { get; private set; }

        public string Phone { get; private set; }

        public string? ZipCode { get; private set; }

        public string City { get; private set; }

        public string District { get; private set; }

        public string FullAddress { get; private set; }
    }
}
