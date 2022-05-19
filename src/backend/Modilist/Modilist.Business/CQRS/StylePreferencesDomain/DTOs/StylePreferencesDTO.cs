using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.StylePreferencesDomain.DTOs
{
    public class StylePreferencesDTO
    {
        public Guid AccountId { get; set; }

        public string ChoiseReasons { get; set; }

        public float LovesShopping { get; set; }

        public float OpenToSuggestions { get; set; }

        public bool PrefersHijabClothing { get; set; }

        public string BodyPartsToHighlight { get; set; }

        public string BodyPartsToHide { get; set; }

        public string ExcludedCategories { get; set; }

        public string ExcludedColors { get; set; }

        public string ExcludedColorCategories { get; set; }

        public string ExcludedPatterns { get; set; }

        public string ExcludedFabrics { get; set; }
    }
}
