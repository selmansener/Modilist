
using System.Collections.Immutable;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.DiscountsDomain;
using Modilist.Domains.Models.PaymentDomain;
using Modilist.Domains.Models.ReturnDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Models.StylePreferencesDomain;
using Modilist.Domains.Models.SubscriptionDomain;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Domains.Models.AccountDomain
{
    public class Account : BaseEntity
    {
        private readonly List<Address> _addresses = new List<Address>();
        private readonly List<PaymentMethod> _paymentMethods = new List<PaymentMethod>();
        private readonly List<SalesOrder> _salesOrders = new List<SalesOrder>();
        private readonly List<Return> _returns = new List<Return>();
        private readonly List<Payment> _payments = new List<Payment>();
        private readonly List<ExclusiveDiscount> _exclusiveDiscounts = new List<ExclusiveDiscount>();
        private readonly List<PublicDiscount> _publicDiscounts = new List<PublicDiscount>();

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
            State = AccountState.Created;
        }

        public new Guid Id { get; private set; }

        public int? SizeInfoId { get; private set; }

        public SizeInfo? SizeInfo { get; private set; }

        public int? StylePreferencesId { get; private set; }

        public StylePreferences? StylePreferences { get; private set; }

        public int? PreferedFabricPropertiesId { get; private set; }

        public PreferedFabricProperties PreferedFabricProperties { get; private set; }

        public int? FitPreferencesId { get; private set; }

        public FitPreferences FitPreferences { get; private set; }

        public int? SubscriptionId { get; private set; }

        public Subscription Subscription { get; private set; }

        public IReadOnlyList<Address> Addresses => _addresses;

        public IReadOnlyList<PaymentMethod> PaymentMethods => _paymentMethods;

        public IReadOnlyList<SalesOrder> SalesOrders => _salesOrders;

        public IReadOnlyList<Return> Returns => _returns;

        public IReadOnlyList<Payment> Payments => _payments;

        public IReadOnlyList<ExclusiveDiscount> ExclusiveDiscounts => _exclusiveDiscounts;

        public IReadOnlyList<PublicDiscount> PublicDiscounts => _publicDiscounts;

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public DateTime? BirthDate { get; private set; }

        public Gender Gender { get; private set; }

        public string? InstagramUserName { get; private set; }

        public string? Email { get; private set; }

        public string? Phone { get; private set; }

        public string? JobTitle { get; private set; }

        public AccountState State { get; private set; }

        public DateTime? ActivatedAt { get; private set; }

        public DateTime? DeactivatedAt { get; private set; }

        public DateTime? BlockedAt { get; private set; }

        public DateTime? VerifiedAt { get; private set; }

        public bool IsVerified { get; private set; }

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

        public void SetSizeInfo(int sizeInfoId)
        {
            if (SizeInfoId.HasValue)
            {
                throw new InvalidOperationException("Account already has a SizeInfo");
            }

            if (sizeInfoId == 0)
            {
                throw new InvalidOperationException("SizeInfoId cannot be null");
            }

            SizeInfoId = sizeInfoId;
        }

        public void SetPreferedFabricProperties(int preferedFabricPropertiesId)
        {
            if (PreferedFabricPropertiesId.HasValue)
            {
                throw new InvalidOperationException("Account already has a PreferedFabricProperties");
            }

            if (preferedFabricPropertiesId == 0)
            {
                throw new InvalidOperationException("PreferedFabricPropertiesId cannot be null or default");
            }

            PreferedFabricPropertiesId = preferedFabricPropertiesId;
        }

        public void SetFitPreferences(int fitPreferencesId)
        {
            if (FitPreferencesId.HasValue)
            {
                throw new InvalidOperationException("Account already has a FitPreferences");
            }

            if (fitPreferencesId == 0)
            {
                throw new InvalidOperationException("FitPreferencesId cannot be null or default");
            }

            FitPreferencesId = fitPreferencesId;
        }

        public void SetStylePreferences(int stylePreferencesId)
        {
            if (StylePreferencesId.HasValue)
            {
                throw new InvalidOperationException("Account already has a StylePreferences");
            }

            if (stylePreferencesId == 0)
            {
                throw new InvalidOperationException("StylePreferencesId cannot be null or default");
            }

            StylePreferencesId = stylePreferencesId;
        }

        public void SetSubscription(int subscriptionId)
        {
            if (SubscriptionId.HasValue)
            {
                throw new InvalidOperationException("Account already has a StylePreferences");
            }

            if (subscriptionId == 0)
            {
                throw new InvalidOperationException("StylePreferencesId cannot be null or default");
            }

            SubscriptionId = subscriptionId;
        }

        public void Activate()
        {
            if (State == AccountState.Active)
            {
                throw new InvalidOperationException("Account is already Active");
            }

            State = AccountState.Active;
            ActivatedAt = DateTime.UtcNow;
        }

        public void Verify()
        {
            IsVerified = true;
            VerifiedAt = DateTime.UtcNow;
        }
    }
}
