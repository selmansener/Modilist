
using System.Diagnostics.Metrics;
using System.Reflection.Emit;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Enums;
using FluentValidation;

namespace Modilist.Domains.Models.SalesOrderDomain
{
    public class BillingAddress : BaseEntity
    {

        private readonly BillingAddressValidator _validator;

        public BillingAddress(

            int salesOrderId,
            string addressName,
            string city,
            string district,
            string fullAddress,
            string email,
            string phone,
            BillingType billingType,
            string fullName = null,
            string zipCode = null,
            string idNumber = null,
            string companyName = null,
            string taxNumber = null,
            string taxOffice = null)
        {
            SalesOrderId = salesOrderId;
            FullName = fullName;
            AddressName = addressName;
            Phone = phone;
            City = city;
            District = district;
            FullAddress = fullAddress;
            Email = email;
            Country = "Turkey";
            IdNumber = idNumber;
            TaxNumber = taxNumber;
            CompanyName = companyName;
            BillingType = billingType;
            ZipCode = zipCode;
            TaxOffice = taxOffice;
            _validator = new BillingAddressValidator();
            _validator.ValidateAndThrow(this);
        }

        public int SalesOrderId { get; private set; }

        public SalesOrder SalesOrder { get; private set; }

        public string? FullName { get; private set; }

        public string? IdNumber { get; private set; }

        public string AddressName { get; private set; }

        public string Phone { get; private set; }

        public string? ZipCode { get; private set; }

        public string City { get; private set; }

        public string District { get; private set; }

        public string FullAddress { get; private set; }

        public string? CompanyName { get; private set; }

        public string Email { get; private set; }

        public string? TaxNumber { get; private set; }

        public string Country { get; private set; }

        public string? TaxOffice { get; private set; }

        public BillingType BillingType { get; private set; }

        internal void UpdateBillingAddress(
            string addressName,
            string city,
            string district,
            string fullAddress,
            string email,
            string phone,
            BillingType billingType,
            string fullName = null,
            string zipCode = null,
            string idNumber = null,
            string companyName = null,
            string taxNumber = null,
            string taxOffice = null)
        {
            FullName = fullName;
            IdNumber = idNumber;
            AddressName = addressName;
            Phone = phone;
            ZipCode = zipCode;
            City = city;
            District = district;
            FullAddress = fullAddress;
            BillingType = billingType;
            CompanyName = companyName;
            Email = email;
            TaxNumber = taxNumber;
            TaxOffice = taxOffice;
            _validator.ValidateAndThrow(this);
        }
    }

    internal class BillingAddressValidator : AbstractValidator<BillingAddress>
    {
        public BillingAddressValidator()
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

