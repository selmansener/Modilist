using Microsoft.AspNetCore.Mvc.Filters;

namespace Modilist.API.Filters
{
    public class ApiKeyAttribute : ActionFilterAttribute
    {
        public ApiKeyAttribute(string key)
        {
            Key = Guid.Parse(key);
        }

        public Guid Key { get; private set; }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var environment = context.HttpContext.RequestServices.GetRequiredService<IHostEnvironment>();

            // TODO: Enable after release
            //if (!environment.IsProduction())
            //{
            //    return;
            //}

            if (!context.HttpContext.Request.Headers.TryGetValue("X-ApiKey", out var apiKey))
            {
                throw new UnauthorizedAccessException();
            }

            var key = apiKey.FirstOrDefault();

            if (string.IsNullOrEmpty(key) || !Guid.TryParse(key, out Guid apiKeyGuid))
            {
                throw new UnauthorizedAccessException();
            }

            if (Key != apiKeyGuid)
            {
                throw new UnauthorizedAccessException();
            }
        }
    }
}
