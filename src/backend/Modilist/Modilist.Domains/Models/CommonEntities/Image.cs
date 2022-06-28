using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Domains.Base;
using Modilist.Infrastructure.Shared.Models;

namespace Modilist.Domains.Models.CommonEntities
{
    public abstract class Image : BaseEntity
    {
        public Image(string name, string contentType, string url, string? extension = null)
        {
            Name = name;
            ContentType = contentType;
            Url = url;
            Extension = extension;
            Variants = new ImageVariants();
        }

        public string Name { get; private set; }

        public string? Extension { get; private set; }

        public string ContentType { get; private set; }

        public string Url { get; private set; }

        public ImageVariants Variants { get; private set; }

        public void SetVariants(
            string? thumbnail = null,
            string? xSmall = null,
            string? small = null,
            string? medium = null,
            string? large = null,
            string? xLarge = null)
        {
            Variants = Variants.SetVariants(thumbnail, xSmall, small, medium, large, xLarge);
        }
    }
}
