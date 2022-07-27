using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.DTOs;

namespace Modilist.API.Area.API.Controllers
{
    public class BlogController : APIBaseController
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public BlogController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpGet("Get")]
        [ProducesResponseType(typeof(BlogMetaData), 200)]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            using (var httpClient = _httpClientFactory.CreateClient())
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":authority:", "www.modilist.com");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":method:", "GET");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":path:", "/_functions/blogContent");
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(":schema:", "https");

                var resp = await httpClient.GetAsync("https://www.modilist.com/_functions/blogContent", cancellationToken);
                var test = resp.Content.ReadAsStreamAsync(cancellationToken);
                var content = await resp.Content.ReadAsStringAsync(cancellationToken);

                return Ok(content);
            }
        }
    }
}
