using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Identity.Web;

using Modilist.API.AuthorizationPolicies;

const string CorsPolicyName = "Default";

var builder = WebApplication.CreateBuilder(args);

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
    options.AddPolicy("ReadTests", policy => policy.Requirements.Add(new ScopesRequirement("Test.Read")));
});

var app = builder.Build();

app.UseCors(CorsPolicyName);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

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
        builder.WithOrigins("https://localhost:3000", "https://app.modilist.com");
        builder.WithHeaders("authorization");
        builder.WithMethods("GET", "POST", "OPTIONS");
        builder.AllowCredentials();
    });
}