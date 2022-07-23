﻿namespace Modilist.Business.CQRS.ReturnDomain.DTOs
{
    public class ReturnAddressDTO
    {
        public string Name { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string? ZipCode { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string FullAddress { get; set; }
    }
}
