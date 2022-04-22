namespace Modilist.API.Extensions
{
    public static class EnvironmentExtensions
    {
        public static bool IsInt(this IWebHostEnvironment environment) => environment.IsEnvironment("Int");
    }
}
