using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.StylePreferencesDomain
{
    public class PreferedFabricProperties : BaseEntity
    {
        public PreferedFabricProperties(
            Guid accountId,
            string? excludedColors,
            string? excludedColorCategories,
            string? excludedPatterns,
            string? excludedFabrics,
            string? allergens,
            string? additionalNotes)
        {
            AccountId = accountId;
            ExcludedColors = excludedColors;
            ExcludedColorCategories = excludedColorCategories;
            ExcludedPatterns = excludedPatterns;
            ExcludedFabrics = excludedFabrics;
            Allergens = allergens;
            AdditionalNotes = additionalNotes;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string? ExcludedColors { get; private set; }

        public string? ExcludedColorCategories { get; private set; }

        public string? ExcludedPatterns { get; private set; }

        public string? ExcludedFabrics { get; private set; }

        public string? Allergens { get; private set; }

        public string? AdditionalNotes { get; private set; }

        public void Update(
            string? excludedColors,
            string? excludedColorCategories,
            string? excludedPatterns,
            string? excludedFabrics,
            string? allergens,
            string? additionalNotes)
        {
            ExcludedColors = excludedColors;
            ExcludedColorCategories = excludedColorCategories;
            ExcludedPatterns = excludedPatterns;
            ExcludedFabrics = excludedFabrics;
            Allergens = allergens;
            AdditionalNotes = additionalNotes;
        }
    }
}
