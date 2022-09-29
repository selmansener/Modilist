using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mapster;

using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;
using Modilist.Infrastructure.Shared.Interfaces.Enums;

namespace Modilist.Business.CQRS.UserDomain.DTOs
{
    internal class NewAccountNotificationDTO
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public Gender Gender { get; set; }

        public SizeInfoDTO SizeInfo { get; set; }

        public StylePreferencesDTO StylePreferences { get; set; }

        public FabricPropertiesDTO PreferedFabricProperties { get; set; }

        public FitPreferences FitPreferences { get; set; }

        public SalesOrderDetailsDTO SalesOrderDetails { get; set; }

        public string MaxPricingLimit { get; set; }

        public string InstagramUserName { get; set; }

        public string JobTitle { get; set; }
    }

    internal class NewAccountNotificationDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Account, NewAccountNotificationDTO>()
                .Map(dest => dest.MaxPricingLimit, src => src.Subscription.MaxPricingLimit)
                .Map(dest => dest.SalesOrderDetails, src => src.SalesOrders.FirstOrDefault(x => x.State == SalesOrderState.Created));
        }
    }

    internal class SalesOrderDetailsDTO
    {
        public DateTime EstimatedDeliveryDate { get; set; }

        public string AdditionalRequests { get; set; }

        public string RequestedStyle { get; set; }
    }

    internal class SizeInfoDTO
    {
        public int Weight { get; set; }

        public int Height { get; set; }

        public BodyType BodyType { get; set; }

        public string? UpperBody { get; set; }

        public string? LowerBody { get; set; }

        public string? WomenUnderWearCup { get; set; }

        public string? WomenUnderWearSize { get; set; }

        public string? MenUnderWear { get; set; }

        public string? OutWear { get; set; }

        public string? FootWear { get; set; }
    }

    internal class StylePreferencesDTO
    {
        public string ChoiceReasons { get; set; }

        public float LovesShopping { get; set; }

        public float OpenToSuggestions { get; set; }

        public bool PrefersHijabClothing { get; set; }

        public string? BodyPartsToHighlight { get; set; }

        public string? BodyPartsToHide { get; set; }

        public string? ExcludedUpperCategories { get; set; }

        public string? ExcludedLowerCategories { get; set; }

        public string? ExcludedOuterCategories { get; set; }

        public string? ExcludedUnderwearCategories { get; set; }

        public string? ExcludedAccessoryCategories { get; set; }

        public string? ExcludedFootwearCategories { get; set; }

        public string? ExcludedBagCategories { get; set; }
    }

    internal class FabricPropertiesDTO
    {
        public string? ExcludedColors { get; set; }

        public string? ExcludedColorCategories { get; set; }

        public string? ExcludedPatterns { get; set; }

        public string? ExcludedFabrics { get; set; }

        public string? ExcludedAccessoryColors { get; set; }

        public string? Allergens { get; set; }

        public string? AdditionalNotes { get; set; }
    }

    internal class FitPreferences
    {
        public string? WaistHeight { get; set; }

        public string? UpperFit { get; set; }

        public string? LowerFit { get; set; }

        public string? LegFit { get; set; }

        public string? SkirtDressLength { get; set; }

        public string? ShortsLength { get; set; }

        public string? FootType { get; set; }
    }
}
