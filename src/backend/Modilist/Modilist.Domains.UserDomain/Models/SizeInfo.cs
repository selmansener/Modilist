using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.UserDomain.Models;

namespace Modilist.Domains.UserDomain.Models
{
    public class SizeInfo : BaseEntity
    {
        private static readonly string _default = "None";

        public SizeInfo(
            Guid accountId,
            string tshirt = null,
            string sweater = null,
            string sweatshirt = null,
            string crop = null,
            string blouse = null,
            string shirt = null,
            string sleevelessUnderShirt = null,
            string bustier = null,
            string bralet = null,
            string tunik = null,
            string dress = null,
            string overalls = null,
            string pants = null,
            string jeans = null,
            string skirt = null,
            string shorts = null,
            string leggings = null,
            string sweatpants = null,
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

        public string Tshirt { get; private set; } = _default;

        public string Sweater { get; private set; } = _default;

        public string Sweatshirt { get; private set; } = _default;

        public string Crop { get; private set; } = _default;

        public string Blouse { get; private set; } = _default;

        public string Shirt { get; private set; } = _default;

        public string SleevelessUnderShirt { get; private set; } = _default;

        public string Bustier { get; private set; } = _default;

        public string Bralet { get; private set; } = _default;

        public string Tunik { get; private set; } = _default;

        public string Dress { get; private set; } = _default;

        public string Overalls { get; private set; } = _default;

        public string Pants { get; private set; } = _default;

        public string Jeans { get; private set; } = _default;

        public string Skirt { get; private set; } = _default;

        public string Shorts { get; private set; } = _default;

        public string Leggings { get; private set; } = _default;

        public string Sweatpants { get; private set; } = _default;

        public int Weight { get; private set; }

        public int Height { get; private set; }

        public int NeckRadius { get; private set; }

        public int BreastRadius { get; private set; }

        public int WaistRadius { get; private set; }

        public int HipRadius { get; private set; }

        public int LegLength { get; private set; }

        public void Update(
            string tshirt,
            string sweater,
            string sweatshirt,
            string crop,
            string blouse,
            string shirt,
            string sleevelessUnderShirt,
            string bustier,
            string bralet,
            string tunik,
            string dress,
            string overalls,
            string pants,
            string jeans,
            string skirt,
            string shorts,
            string leggings,
            string sweatpants,
            int weight,
            int height,
            int neckRadius,
            int breastRadius,
            int waistRadius,
            int hipRadius,
            int legLength)
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
