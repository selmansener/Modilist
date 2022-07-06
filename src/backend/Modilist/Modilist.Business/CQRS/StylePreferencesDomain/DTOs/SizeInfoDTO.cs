
using Modilist.Infrastructure.Shared.Enums;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.DTOs
{
    public class SizeInfoDTO
    {
        [JsonIgnore]
        public int Id { get; set; }

        [JsonIgnore]
        public Guid AccountId { get; set; }

        public BodyType BodyType { get; set; }

        public string UpperBody { get; set; }

        public string LowerBody { get; set; }

        public string WomenUnderWearCup { get; set; }

        public string WomenUnderWearSize { get; set; }

        public string MenUnderWear { get; set; }

        public string OutWear { get; set; }

        public string FootWear { get; set; }

        public string AdditionalNotes { get; set; }

        public int Weight { get; set; }

        public int Height { get; set; }

        public int? ShoulderWidth { get; set; }
        
        public int? HeadRadius { get; set; }
        
        public int? ArmLength { get; set; }
        
        public int? BodyLength { get; set; }
        
        public int? NeckRadius { get; set; }
        
        public int? BreastRadius { get; set; }
        
        public int? WaistRadius { get; set; }
        
        public int? HipRadius { get; set; }
        
        public int? LegLength { get; set; }
        
        public int? FootLength { get; set; }
    }
}
