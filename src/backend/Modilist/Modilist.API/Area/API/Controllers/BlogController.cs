using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

using Modilist.API.Configurations;
using Modilist.Business.DTOs;

namespace Modilist.API.Area.API.Controllers
{
    public class BlogController : APIBaseController
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _memoryCache;

        public BlogController(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache)
        {
            _httpClientFactory = httpClientFactory;
            _memoryCache = memoryCache;
        }

        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpGet("[controller].Get")]
        [ProducesResponseType(typeof(BlogMetaData), 200)]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            if (_memoryCache.TryGetValue("blogContent", out string metaData))
            {
                return Ok(metaData);
            }

            using (var httpClient = _httpClientFactory.CreateClient())
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":authority:", "www.modilist.com");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":method:", "GET");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":path:", "/_functions/blogContent");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":schema:", "https");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("user-agent", "Dotnet");

                var resp = await httpClient.GetAsync("https://www.modilist.com/_functions/blogContent", cancellationToken);
                var content = await resp.Content.ReadAsStringAsync(cancellationToken);

                var cacheEntry = _memoryCache.CreateEntry("blogContent");
                cacheEntry.SetValue(content);
                cacheEntry.SetAbsoluteExpiration(DateTimeOffset.UtcNow.AddDays(1));

                return Ok(content);
            }
        }
    }
}
