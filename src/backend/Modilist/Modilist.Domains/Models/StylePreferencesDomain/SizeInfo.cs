
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.StylePreferencesDomain
{
    public class SizeInfo : BaseEntity
    {
        public SizeInfo(
            Guid accountId,
            string? tshirt = null,
            string? sweater = null,
            string? sweatshirt = null,
            string? crop = null,
            string? blouse = null,
            string? shirt = null,
            string? sleevelessUnderShirt = null,
            string? bustier = null,
            string? bralet = null,
            string? tunik = null,
            string? dress = null,
            string? overalls = null,
            string? pants = null,
            string? jeans = null,
            string? skirt = null,
            string? shorts = null,
            string? leggings = null,
            string? sweatpants = null,
            int weight = 0,
            int height = 0,
            int neckRadius = 0,
            int breastRadius = 0,
            int waistRadius = 0,
            int hipRadius = 0,
            int legLength = 0)
        {
            AccountId = accountId;
            Tshirt = tshirt;
            Sweater = sweater;
            Sweatshirt = sweatshirt;
            Crop = crop;
            Blouse = blouse;
            Shirt = shirt;
            SleevelessUnderShirt = sleevelessUnderShirt;
            Bustier = bustier;
            Bralet = bralet;
            Tunik = tunik;
            Dress = dress;
            Overalls = overalls;
            Pants = pants;
            Jeans = jeans;
            Skirt = skirt;
            Shorts = shorts;
            Leggings = leggings;
            Sweatpants = sweatpants;
            Weight = weight;
            Height = height;
            NeckRadius = neckRadius;
            BreastRadius = breastRadius;
            WaistRadius = waistRadius;
            HipRadius = hipRadius;
            LegLength = legLength;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string? Tshirt { get; private set; }

        public string? Sweater { get; private set; }

        public string? Sweatshirt { get; private set; }

        public string? Crop { get; private set; }

        public string? Blouse { get; private set; }

        public string? Shirt { get; private set; }

        public string? SleevelessUnderShirt { get; private set; }

        public string? Bustier { get; private set; }

        public string? Bralet { get; private set; }

        public string? Tunik { get; private set; }

        public string? Dress { get; private set; }

        public string? Overalls { get; private set; }

        public string? Pants { get; private set; }

        public string? Jeans { get; private set; }

        public string? Skirt { get; private set; }

        public string? Shorts { get; private set; }

        public string? Leggings { get; private set; }

        public string? Sweatpants { get; private set; }

        public int Weight { get; private set; }

        public int Height { get; private set; }

        public int NeckRadius { get; private set; }

        public int BreastRadius { get; private set; }

        public int WaistRadius { get; private set; }

        public int HipRadius { get; private set; }

        public int LegLength { get; private set; }

        public void Update(
            int weight,
            int height,
            int neckRadius,
            int breastRadius,
            int waistRadius,
            int hipRadius,
            int legLength,
            string? tshirt = null,
            string? sweater = null,
            string? sweatshirt = null,
            string? crop = null,
            string? blouse = null,
            string? shirt = null,
            string? sleevelessUnderShirt = null,
            string? bustier = null,
            string? bralet = null,
            string? tunik = null,
            string? dress = null,
            string? overalls = null,
            string? pants = null,
            string? jeans = null,
            string? skirt = null,
            string? shorts = null,
            string? leggings = null,
            string? sweatpants = null)
        {
            Tshirt = tshirt;
            Sweater = sweater;
            Sweatshirt = sweatshirt;
            Crop = crop;
            Blouse = blouse;
            Shirt = shirt;
            SleevelessUnderShirt = sleevelessUnderShirt;
            Bustier = bustier;
            Bralet = bralet;
            Tunik = tunik;
            Dress = dress;
            Overalls = overalls;
            Pants = pants;
            Jeans = jeans;
            Skirt = skirt;
            Shorts = shorts;
            Leggings = leggings;
            Sweatpants = sweatpants;
            Weight = weight;
            Height = height;
            NeckRadius = neckRadius;
            BreastRadius = breastRadius;
            WaistRadius = waistRadius;
            HipRadius = hipRadius;
            LegLength = legLength;
        }
    }
}
