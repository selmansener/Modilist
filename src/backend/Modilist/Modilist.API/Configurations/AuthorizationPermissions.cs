namespace Modilist.API.Configurations
{
    public struct AuthorizationPermissions
#pragma warning restore CA1815 // Override equals and operator equals on value types
    {
//        private const string _base = "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/";

        // Account
        public const string CreateAccount = "Accounts.Create";
        public const string UpdateAccount = "Accounts.Update";
    }
}
