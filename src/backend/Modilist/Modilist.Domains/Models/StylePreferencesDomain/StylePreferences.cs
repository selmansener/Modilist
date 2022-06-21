
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.StylePreferencesDomain
{
    public class StylePreferences : BaseEntity
    {
        public StylePreferences(
            Guid accountId,
            string choiceReasons,
            float lovesShopping,
            float openToSuggestions,
            bool prefersHijabClothing,
            string? bodyPartsToHighlight,
            string? bodyPartsToHide,
            string? excludedUpperCategories,
            string? excludedLowerCategories,
            string? excludedOuterCategories,
            string? excludedUnderwearCategories,
            string? excludedAccessoryCategories,
            string? excludedFootwearCategories,
            string? excludedBagCategories)
        {
            AccountId = accountId;
            ChoiceReasons = choiceReasons;
            LovesShopping = lovesShopping;
            OpenToSuggestions = openToSuggestions;
            PrefersHijabClothing = prefersHijabClothing;
            BodyPartsToHighlight = bodyPartsToHighlight;
            BodyPartsToHide = bodyPartsToHide;
            ExcludedUpperCategories = excludedUpperCategories;
            ExcludedLowerCategories = excludedLowerCategories;
            ExcludedOuterCategories = excludedOuterCategories;
            ExcludedUnderwearCategories = excludedUnderwearCategories;
            ExcludedAccessoryCategories = excludedAccessoryCategories;
            ExcludedFootwearCategories = excludedFootwearCategories;
            ExcludedBagCategories = excludedBagCategories;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string ChoiceReasons { get; private set; }

        public float LovesShopping { get; private set; }

        public float OpenToSuggestions { get; private set; }

        public bool PrefersHijabClothing { get; private set; }

        public string? BodyPartsToHighlight { get; private set; }

        public string? BodyPartsToHide { get; private set; }

        public string? ExcludedUpperCategories { get; private set; }

        public string? ExcludedLowerCategories { get; private set; }

        public string? ExcludedOuterCategories { get; private set; }

        public string? ExcludedUnderwearCategories { get; private set; }

        public string? ExcludedAccessoryCategories { get; private set; }

        public string? ExcludedFootwearCategories { get; private set; }

        public string? ExcludedBagCategories { get; private set; }

        public void UpdateStylePreferences(
            string choiceReasons,
            float lovesShopping,
            float openToSuggestions,
            bool prefersHijabClothing,
            string bodyPartsToHighlight,
            string bodyPartsToHide,
            string excludedUpperCategories,
            string excludedLowerCategories,
            string excludedOuterCategories,
            string excludedUnderwearCategories,
            string excludedAccessoryCategories,
            string excludedFootwearCategories,
            string excludedBagCategories)
        {
            ChoiceReasons = choiceReasons;
            LovesShopping = lovesShopping;
            OpenToSuggestions = openToSuggestions;
            PrefersHijabClothing = prefersHijabClothing;
            BodyPartsToHighlight = bodyPartsToHighlight;
            BodyPartsToHide = bodyPartsToHide;
            ExcludedUpperCategories = excludedUpperCategories;
            ExcludedLowerCategories = excludedLowerCategories;
            ExcludedOuterCategories = excludedOuterCategories;
            ExcludedUnderwearCategories = excludedUnderwearCategories;
            ExcludedAccessoryCategories = excludedAccessoryCategories;
            ExcludedFootwearCategories = excludedFootwearCategories;
            ExcludedBagCategories = excludedBagCategories;
        }
    }
}
