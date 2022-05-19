using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Domains.StylePreferences.Models
{
    public class StylePreference : BaseEntity
    {
        public StylePreference(Guid accountId)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string? ChoiseReasons { get; private set; }

        public float LovesShopping { get; private set; }

        public float OpenToSuggestions { get; private set; }

        public bool PrefersHijabClothing { get; private set; }

        public string? BodyPartsToHighlight { get; private set; }

        public string? BodyPartsToHide { get; private set; }

        public string? ExcludedCategories { get; private set; }

        public string? ExcludedColors { get; private set; }

        public string? ExcludedColorCategories { get; private set; }

        public string? ExcludedPatterns { get; private set; }

        public string? ExcludedFabrics { get; private set; }

        public void UpdateStylePreferences(
            string choiseReasons,
            float lovesShopping,
            float openToSuggestions,
            bool prefersHijabClothing,
            string bodyPartsToHighlight,
            string bodyPartsToHide,
            string excludedCategories,
            string excludedColors,
            string excludedColorCategories,
            string excludedPatterns,
            string excludedFabrics)
        {
            ChoiseReasons = choiseReasons;
            LovesShopping = lovesShopping;
            OpenToSuggestions = openToSuggestions;
            PrefersHijabClothing = prefersHijabClothing;
            BodyPartsToHighlight = bodyPartsToHighlight;
            BodyPartsToHide = bodyPartsToHide;
            ExcludedCategories = excludedCategories;
            ExcludedColors = excludedColors;
            ExcludedColorCategories = excludedColorCategories;
            ExcludedPatterns = excludedPatterns;
            ExcludedFabrics = excludedFabrics;
        }
    }
}
