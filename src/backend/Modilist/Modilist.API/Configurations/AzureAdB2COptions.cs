namespace Modilist.API.Configurations
{
    internal class AzureAdB2COptions
    {
        public string Domain { get; set; }

        public string ClientId { get; set; }

        public string OpenIdConnectUrl { get; set; }

        public string AuthorizationUrl { get; set; }
    }
}
