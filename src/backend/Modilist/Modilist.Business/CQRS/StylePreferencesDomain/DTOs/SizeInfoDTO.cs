using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.DTOs
{
    public class SizeInfoDTO
    {
        [JsonIgnore]
        public int Id { get; set; }

        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string Tshirt { get; set; }

        public string Sweater { get; set; }

        public string Sweatshirt { get; set; }

        public string Crop { get; set; }

        public string Blouse { get; set; }

        public string Shirt { get; set; }

        public string SleevelessUnderShirt { get; set; }

        public string Bustier { get; set; }

        public string Bralet { get; set; }

        public string Tunik { get; set; }

        public string Dress { get; set; }

        public string Overalls { get; set; }

        public string Pants { get; set; }

        public string Jeans { get; set; }

        public string Skirt { get; set; }

        public string Shorts { get; set; }

        public string Leggings { get; set; }

        public string Sweatpants { get; set; }

        public int Weight { get; set; }

        public int Height { get; set; }

        public int NeckRadius { get; set; }

        public int BreastRadius { get; set; }

        public int WaistRadius { get; set; }

        public int HipRadius { get; set; }

        public int LegLength { get; set; }
    }
}
