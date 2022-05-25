using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

using Modilist.API.Filters;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace Modilist.API.SwaggerConfiguration.Filters
{
    public class ApiKeyHeaderParameterOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var filterPipeline = context.ApiDescription.ActionDescriptor.FilterDescriptors;
            var hasApiKey = filterPipeline.Select(filterInfo => filterInfo.Filter).Any(filter => filter is ApiKeyAttribute);

            if (hasApiKey)
            {
                if (operation.Parameters == null)
                    operation.Parameters = new List<OpenApiParameter>();

                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = "X-ApiKey",
                    In = ParameterLocation.Header,
                    Description = "X-ApiKey",
                    Required = true,
                    Schema = new OpenApiSchema
                    {
                        Type = "string",
                        Default = new OpenApiString(string.Empty)
                    }
                });
            }
        }
    }
}
