﻿using Microsoft.AspNetCore.Mvc;

namespace Modilist.API.Area.API.Controllers
{
    [ApiController]
    [Area("api")]
    [Route("[area]/v1/")]
    public abstract class APIBaseController : Controller
    {
    }
}
