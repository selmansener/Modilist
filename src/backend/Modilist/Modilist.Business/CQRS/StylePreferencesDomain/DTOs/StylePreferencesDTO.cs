using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.StylePreferencesDomain.DTOs
{
    public class StylePreferencesDTO
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
}
