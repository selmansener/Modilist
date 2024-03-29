﻿namespace Modilist.Business.DTOs
{
    public class BlogMetaData
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string BlogUrl { get; set; }

        public int ViewCount { get; set; }

        public int LikeCount { get; set; }

        public DateTime PublishedDate { get; set; }
    }
}
