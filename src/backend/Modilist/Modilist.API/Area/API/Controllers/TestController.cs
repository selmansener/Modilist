using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Modilist.API.Area.API.Controllers
{
    public class TestController : APIBaseController
    {
        [Authorize("ReadTests")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var randomJson = "{\"ruler\":[1361708937.8187995,\"oil\",[false,\"appropriate\",\"glad\",false,-181752195.28076124,true],true,\"quarter\",2002117914],\"sand\":false,\"forward\":\"dog\",\"chamber\":\"fairly\",\"when\":-1001580183.637681,\"instrument\":true}";

            return Ok(randomJson);
        }
    }
}
