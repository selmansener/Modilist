using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.StylePreferencesDomain.DTOs
{
    public class FitPreferencesDTO
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
