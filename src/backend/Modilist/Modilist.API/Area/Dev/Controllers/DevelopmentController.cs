using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Filters;
using Modilist.Business.Seed;
using Modilist.Business.Seed.Configuration;

namespace Modilist.API.Area.Dev.Controllers
{
    [ApiController]
    [Area("api")]
    [Route("[area]/v{v:apiVersion}")]
    [Authorize("Development")]
    [ApiKey("c6048fc9-6ccd-4156-badb-d0c188815877")]
    public class DevelopmentController : Controller
    {
        private readonly ISeeder _seeder;

        public DevelopmentController(ISeeder seeder)
        {
            _seeder = seeder;
        }

        [HttpPost("Seed")]
        public async Task<IActionResult> Seed(SeedServiceType seedServiceType, CancellationToken cancellationToken, bool recreateDb = false)
        {
            if (recreateDb)
            {
                _seeder.ClearExecutedServices();
            }

            await _seeder.Seed(seedServiceType, cancellationToken);

            return NoContent();
        }
    }
}
