using System;

using FluentValidation;

using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Business.CQRS.SalesOrderDomain.DTOs
{
    public class BillingAddressDTO
    {

        public string FullName { get;  set; }

        public string IdNumber { get;  set; }

        public string AddressName { get;  set; }

        public string Phone { get;  set; }

        public string ZipCode { get;  set; }

        public string City { get;  set; }

        public string Country { get; set; } = "Turkey";

        public string District { get;  set; }

        public string FullAddress { get;  set; }

        public string CompanyName { get;  set; }

        public string Email { get;  set; }

        public string TaxNumber { get;  set; }

        public string TaxOffice { get; set; }

        public BillingType BillingType { get;  set; }
    }

   internal class BillingAddressDTOValidator : AbstractValidator<BillingAddressDTO>
    {
       public BillingAddressDTOValidator()
        {
            RuleFor(x => x.BillingType).NotEmpty().IsInEnum().NotEqual(BillingType.None);
            RuleFor(x => x.FullName).NotEmpty().When(x => x.BillingType == BillingType.Individual);
            RuleFor(x => x.IdNumber).NotEmpty().When(x => x.BillingType == BillingType.Individual);
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.District).NotEmpty();
            RuleFor(x => x.CompanyName).NotEmpty().When(x => x.BillingType == BillingType.Organization);
            RuleFor(x => x.Email).NotEmpty().When(x => x.BillingType == BillingType.Organization);
            RuleFor(x => x.TaxNumber).NotEmpty().When(x => x.BillingType == BillingType.Organization);
            RuleFor(x => x.AddressName).NotEmpty();
            RuleFor(x => x.FullAddress).NotEmpty();
            RuleFor(x => x.TaxOffice).NotEmpty().When(x => x.BillingType == BillingType.Organization);
        }
    }

}

