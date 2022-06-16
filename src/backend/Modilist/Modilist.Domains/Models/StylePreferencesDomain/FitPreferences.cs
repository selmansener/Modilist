using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;

namespace Modilist.Domains.Models.StylePreferencesDomain
{
    public class FitPreferences : BaseEntity
    {
        public FitPreferences(
            Guid accountId,
            string? waistHeight,
            string? upperFit,
            string? lowerFit,
            string? legFit,
            string? skirtDressLength,
            string? shortsLength,
            string? footType)
        {
            AccountId = accountId;
            WaistHeight = waistHeight;
            UpperFit = upperFit;
            LowerFit = lowerFit;
            LegFit = legFit;
            SkirtDressLength = skirtDressLength;
            ShortsLength = shortsLength;
            FootType = footType;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string? WaistHeight { get; private set; }

        public string? UpperFit { get; private set; }

        public string? LowerFit { get; private set; }

        public string? LegFit { get; private set; }

        public string? SkirtDressLength { get; private set; }

        public string? ShortsLength { get; private set; }

        public string? FootType { get; private set; }

        public void Update(
                string? waistHeight,
                string? upperFit,
                string? lowerFit,
                string? legFit,
                string? skirtDressLength,
                string? shortsLength,
                string? footType)
        {
            WaistHeight = waistHeight;
            UpperFit = upperFit;
            LowerFit = lowerFit;
            LegFit = legFit;
            SkirtDressLength = skirtDressLength;
            ShortsLength = shortsLength;
            FootType = footType;
        }
    }
}
