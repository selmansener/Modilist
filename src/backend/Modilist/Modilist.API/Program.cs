using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Identity.Web;

using Modilist.API.AuthorizationPolicies;
using Modilist.API.Configurations;
using Modilist.Business.Seed;
using Modilist.Business.Extensions;
using Modilist.Data.Extensions;
using Swashbuckle.AspNetCore.SwaggerUI;
using Swashbuckle.AspNetCore.SwaggerGen;
using Modilist.API.SwaggerConfiguration.Filters;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Modilist.API.Middlewares;
using Newtonsoft.Json.Converters;
using Modilist.API.Extensions;
using FluentValidation.AspNetCore;

const string CorsPolicyName = "Default";
const string ApiTitle = "ModilistAPI";
const string SwaggerEndpoint = "/swagger/v1/swagger.json";

var builder = WebApplication.CreateBuilder(args);

var appSettings = builder.Configuration.GetSection("AppSettings");
var config = appSettings.Get<ConfigurationOptions>();

builder.Services.AddCors(ConfigureCors);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(options =>
    {
        builder.Configuration.Bind("AzureAdB2C", options);

        options.TokenValidationParameters.NameClaimType = "name";
    },
    options => { builder.Configuration.Bind("AzureAdB2C", options); });

builder.Services.AddControllers();


Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

builder.Services.AddAuthorization(options =>
{
    var permissions = GetPermissions();

    foreach (var permission in permissions)
    {
        options.AddPolicy(permission.Key, policy => policy.Requirements.Add(new ScopesRequirement(permission.Value)));
    }
});

builder.Services.AddRepositories();

builder.Services.AddCQRS();

builder.Services.AddCors(ConfigureCors);

builder.Services.AddDataAccess(config.ModilistDbConnectionOptions, builder.Environment);

builder.Services.AddSeedServices(builder.Environment.EnvironmentName);

var mvcBuilder = builder.Services.AddMvc(ConfigureMvc)
    .AddNewtonsoftJson(ConfigureNewtonsoftJson)
    .ConfigureApiBehaviorOptions(ConfigureApiBehavior);

mvcBuilder.AddValidations();

builder.Services.AddLoggingBehavior();
builder.Services.AddValidationBehavior();

builder.Services.AddSwaggerGenNewtonsoftSupport();
builder.Services.AddSwaggerGen(ConfigureSwaggerGenerator);

builder.Services.AddApiVersioning(ConfigureApiVersioning);

builder.Services.AddVersionedApiExplorer(ConfigureApiExplorer);

var app = builder.Build();

app.UseCors(CorsPolicyName);

if (app.Environment.IsDevelopment() || app.Environment.IsInt())
{
    app.UseSwagger();
    app.UseSwaggerUI(ConfigureSwaggerUI);
    app.UseStaticFiles();
}

app.UseExceptionHandlerMiddleware();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

void ConfigureCors(CorsOptions obj)
{
    obj.AddPolicy(CorsPolicyName, builder =>
    {
        builder.WithOrigins(config.AllowedOrigins.ToArray());
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowCredentials();
    });
}

void ConfigureSwaggerUI(SwaggerUIOptions options)
{
    options.SwaggerEndpoint(SwaggerEndpoint, ApiTitle);
    options.DocExpansion(DocExpansion.None);
    options.DisplayRequestDuration();
    options.OAuthClientId(config.AzureAdB2COptions.ClientId);
    options.InjectJavascript("https://code.jquery.com/jquery-3.6.0.min.js");
    options.InjectJavascript("../js/swagger-seed-dropdown-sorting.js");
}

void ConfigureSwaggerGenerator(SwaggerGenOptions options)
{
    options.OperationFilter<ResolveDynamicQueryEndpoints>("dqb");
    options.SwaggerDoc("v1", new OpenApiInfo { Title = ApiTitle, Version = "v1" });
    options.CustomSchemaIds(DefaultSchemaIdSelector);
    // options.SchemaFilter<RequireValueTypePropertiesSchemaFilter>(true);
    // options.SchemaFilter<SwaggerExcludeFilter>();

    var permissions = GetPermissions().ToDictionary(
        x => $"https://{config.AzureAdB2COptions.Domain}/{config.AzureAdB2COptions.ClientId}/{x.Value}", 
        x => x.Key);

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.OAuth2,
        Scheme = "Bearer",
        OpenIdConnectUrl = new Uri(config.AzureAdB2COptions.OpenIdConnectUrl, UriKind.Absolute),
        Flows = new OpenApiOAuthFlows
        {
            Implicit = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri(config.AzureAdB2COptions.AuthorizationUrl, UriKind.Absolute),
                Scopes = permissions
            }
        }
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                            Type = SecuritySchemeType.OAuth2,
                            OpenIdConnectUrl = new Uri(config.AzureAdB2COptions.OpenIdConnectUrl, UriKind.Absolute),
                            Flows = new OpenApiOAuthFlows
                            {
                                Implicit = new OpenApiOAuthFlow
                                {
                                    AuthorizationUrl = new Uri(config.AzureAdB2COptions.AuthorizationUrl, UriKind.Absolute),
                                    Scopes = permissions
                                }
                            }
                        },
                        new List<string>()
                    }
                });

    var enabledAreas = new List<string>
            {
                "api",
                "dev"
            };

    options.DocumentFilter<SwaggerAreaFilter>(new object[] { enabledAreas.ToArray() });
}

string DefaultSchemaIdSelector(Type modelType)
{
    if (!modelType.IsConstructedGenericType)
    {
        return modelType.Name;
    }

    string prefix = modelType.GetGenericArguments()
        .Select(genericArg => DefaultSchemaIdSelector(genericArg))
        .Aggregate((previous, current) => previous + current);

    return prefix + modelType.Name.Split('`').First();
}

void ConfigureMvc(MvcOptions options)
{
    // This line adds a caching profile to use in controllers or actions.
    options.CacheProfiles.Add("Default", new CacheProfile { Duration = -1, Location = ResponseCacheLocation.None, NoStore = true });
    // This line adds default cache profile to all controllers as a filter.
    options.Filters.Add(new ResponseCacheAttribute { CacheProfileName = "Default" });
}

void ConfigureNewtonsoftJson(MvcNewtonsoftJsonOptions options)
{
    options.SerializerSettings.ContractResolver =
          new CamelCasePropertyNamesContractResolver();
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.Converters.Add(new StringEnumConverter());
    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
    options.SerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mm:ss.FFFZ";
}

void ConfigureApiBehavior(ApiBehaviorOptions options)
{
    // SuppressModelStateInvalidFilter prevents automatically returning HttpStatus 400 when the ModelState is not valid.
    // The reason to preventing this is throwing a ValidationException to customize the response with a special format.
    // Related code can be found in ReportModelValidationErrorsFilter.
    options.SuppressModelStateInvalidFilter = true;
}

void ConfigureApiVersioning(ApiVersioningOptions options)
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
}

void ConfigureApiExplorer(ApiExplorerOptions options)
{
    // add the versioned api explorer, which also adds IApiVersionDescriptionProvider service
    // note: the specified format code will format the version as "'v'major[.minor][-status]"
    options.GroupNameFormat = "'v'V";

    // note: this option is only necessary when versioning by url segment. the SubstitutionFormat
    // can also be used to control the format of the API version in route templates
    options.SubstituteApiVersionInUrl = true;
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
}

IDictionary<string, string> GetPermissions()
{
    var authPermissions = new AuthorizationPermissions();
    var fields = typeof(AuthorizationPermissions).GetFields();
    var permissions = new Dictionary<string, string>();

    foreach (var field in fields)
    {
        if (!permissions.ContainsKey(field.Name))
        {
            permissions.Add(field.Name, field.GetValue(permissions).ToString());
        }
    }

    return permissions;
}