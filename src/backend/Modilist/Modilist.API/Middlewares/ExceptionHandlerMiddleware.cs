using FluentValidation;

using Modilist.API.Models;
using Modilist.Infrastructure.Shared.Interfaces;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Modilist.API.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly string _exceptionResponseContentType = "application/json";
        private readonly RequestDelegate _next;
        private ILogger<ExceptionHandlerMiddleware> _logger;
        private IWebHostEnvironment _environment;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<ExceptionHandlerMiddleware> logger, IWebHostEnvironment environment)
        {
            try
            {
                _logger = logger;
                _environment = environment;

                await _next.Invoke(context);
            }
            catch (Exception clientException) when (clientException is IClientException)
            {
            }
            catch (Exception exception) when (exception is ValidationException validationException)
            {
                var exceptionResponse = new ExceptionResponse(validationException, _environment);

                var exceptionResponseBody = JsonConvert.SerializeObject(exceptionResponse, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    NullValueHandling = NullValueHandling.Ignore
                });

                context.Response.ContentType = _exceptionResponseContentType;
                context.Response.StatusCode = exceptionResponse.StatusCode;
                await context.Response.WriteAsync(exceptionResponseBody);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                var exceptionResponse = new ExceptionResponse(ex, _environment);

                var exceptionResponseBody = JsonConvert.SerializeObject(exceptionResponse, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    NullValueHandling = NullValueHandling.Ignore
                });

                context.Response.ContentType = _exceptionResponseContentType;
                context.Response.StatusCode = exceptionResponse.StatusCode;
                await context.Response.WriteAsync(exceptionResponseBody);
            }
        }

        public sealed class ExceptionResponse : CommonResponse<object?>
        {
            public ExceptionResponse(Exception exception, IWebHostEnvironment environment)
                : base(0, null)
            {
                if (exception is IClientException clientException)
                {
                    // TODO: get status code from a dictionary
                    StatusCode = 400;
                    Message = exception.Message;
                    Type = exception.GetType().Name;
                    Data = clientException;
                }
                else if (exception is ValidationException validationException) 
                {
                    StatusCode = 400;
                    Message = validationException.Message;
                    Type = validationException.GetType().Name;
                    Errors = GetErrors(validationException);
                }
                else
                {
                    StatusCode = 500;
                    Message = environment.IsProduction() ? "Opps! We fucked up somewhere." : exception.Message;
                    Type = environment.IsProduction() ? null : exception.GetType().Name;
                    Data = environment.IsProduction() ? null : exception.Data;
                }
            }

            public IDictionary<string, List<string>> Errors { get; private set; }

            private IDictionary<string, List<string>> GetErrors(ValidationException validationException)
            {
                Dictionary<string, List<string>> errors = new Dictionary<string, List<string>>();

                var groupedErrors = validationException.Errors.GroupBy(x => x.PropertyName);

                foreach (var groupedError in groupedErrors)
                {
                    foreach (var error in groupedError)
                    {

                        if (errors.ContainsKey(groupedError.Key))
                        {
                            errors[groupedError.Key].Add(error.ErrorCode);
                        }
                        else
                        {
                            errors.Add(groupedError.Key, new List<string>()
                            {
                                error.ErrorCode
                            });
                        }
                    }
                }

                return errors;
            }
        }
    }

    public static class ExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionHandlerMiddleware(this IApplicationBuilder builder)
        {
            builder.UseMiddleware<ExceptionHandlerMiddleware>();

            return builder;
        }
    }
}
