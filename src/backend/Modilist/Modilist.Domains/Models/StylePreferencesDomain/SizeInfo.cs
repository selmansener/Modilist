
using Modilist.Domains.Base;
using Modilist.Domains.Models.AccountDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Domains.Models.StylePreferencesDomain
{
    public class SizeInfo : BaseEntity
    {
        public SizeInfo(
            Guid accountId,
            BodyType bodyType,
            int weight = 0,
            int height = 0,
            int? shoulderWidth = 0,
            int? headRadius = 0,
            int? armLength = 0,
            int? bodyLength = 0,
            int? neckRadius = 0,
            int? breastRadius = 0,
            int? waistRadius = 0,
            int? hipRadius = 0,
            int? legLength = 0,
            int? footLength = 0,
            string? upperBody = null,
            string? lowerBody = null,
            string? womenUnderWearCup = null,
            string? womenUnderWearSize = null,
            string? menUnderWear = null,
            string? outWear = null,
            string? footWear = null,
            string? additionalNotes = null)
        {
            AccountId = accountId;
            BodyType = bodyType;
            Weight = weight;
            Height = height;
            ShoulderWidth = shoulderWidth;
            HeadRadius = headRadius;
            ArmLength = armLength;
            BodyLength = bodyLength;
            NeckRadius = neckRadius;
            BreastRadius = breastRadius;
            WaistRadius = waistRadius;
            HipRadius = hipRadius;
            LegLength = legLength;
            FootLength = footLength;
            UpperBody = upperBody;
            LowerBody = lowerBody;
            WomenUnderWearCup = womenUnderWearCup;
            WomenUnderWearSize = womenUnderWearSize;
            MenUnderWear = menUnderWear;
            OutWear = outWear;
            FootWear = footWear;
            AdditionalNotes = additionalNotes;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public BodyType BodyType { get; private set; }

        public string? UpperBody { get; private set; }

        public string? LowerBody { get; private set; }

        public string? WomenUnderWearCup { get; private set; }

        public string? WomenUnderWearSize { get; private set; }

        public string? MenUnderWear { get; private set; }

        public string? OutWear { get; private set; }

        public string? FootWear { get; private set; }

        public int Weight { get; private set; }

        public int Height { get; private set; }

        public int? ShoulderWidth { get; private set; }

        public int? HeadRadius { get; private set; }

        public int? ArmLength { get; private set; }

        public int? BodyLength { get; private set; }

        public int? NeckRadius { get; private set; }

        public int? BreastRadius { get; private set; }

        public int? WaistRadius { get; private set; }

        public int? HipRadius { get; private set; }

        public int? LegLength { get; private set; }

        public int? FootLength { get; private set; }

        public string? AdditionalNotes { get; private set; }

        public void Update(
            BodyType bodyType,
            int weight,
            int height,
            int? shoulderWidth,
            int? headRadius,
            int? armLength,
            int? bodyLength,
            int? neckRadius,
            int? breastRadius,
            int? waistRadius,
            int? hipRadius,
            int? legLength,
            int? footLength,
            string? upperBody = null,
            string? lowerBody = null,
            string? womenUnderWearCup = null,
            string? womenUnderWearSize = null,
            string? menUnderWear = null,
            string? outWear = null,
            string? footWear = null,
            string? additionalNotes = null)
        {
            BodyType = bodyType;
            Weight = weight;
            Height = height;
            ShoulderWidth = shoulderWidth;
            HeadRadius = headRadius;
            ArmLength = armLength;
            BodyLength = bodyLength;
            NeckRadius = neckRadius;
            BreastRadius = breastRadius;
            WaistRadius = waistRadius;
            HipRadius = hipRadius;
            LegLength = legLength;
            FootLength = footLength;
            UpperBody = upperBody;
            LowerBody = lowerBody;
            WomenUnderWearCup = womenUnderWearCup;
            WomenUnderWearSize = womenUnderWearSize;
            MenUnderWear = menUnderWear;
            OutWear = outWear;
            FootWear = footWear;
            AdditionalNotes = additionalNotes;
        }
    }
}
