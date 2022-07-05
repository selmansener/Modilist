namespace Modilist.Business.CQRS.StylePreferencesDomain.DTOs
{
    public class PreferedFabricPropertiesDTO
    {
        public string? ExcludedColors { get; set; }

        public string? ExcludedColorCategories { get; set; }

        public string? ExcludedPatterns { get; set; }

        public string? ExcludedFabrics { get; set; }

        public string? ExcludedAccessoryColors { get; set; }

        public string? Allergens { get; set; }

        public string? AdditionalNotes { get; set; }
    }
}
