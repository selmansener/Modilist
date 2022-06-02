namespace Modilist.API.Configurations
{
    public struct AuthorizationPermissions
#pragma warning restore CA1815 // Override equals and operator equals on value types
    {
        //        private const string _base = "https://modilistauth.onmicrosoft.com/70773d38-9a72-4f72-af81-17eb6737353c/";

        // Account
        public const string GetAccount = "Accounts.Get";
        public const string CreateAccount = "Accounts.Create";
        public const string UpdateAccount = "Accounts.Update";

        public const string GetStylePreferences = "StylePreferences.Get";
        public const string CreateStylePreferences = "StylePreferences.Create";
        public const string UpdateStylePreferences = "StylePreferences.Update";

        public const string GetAddress = "Address.Get";
        public const string CreateAddress = "Address.Create";
        public const string UpdateAddress = "Address.Update";

        public const string GetSizeInfo = "SizeInfo.Get";
        public const string UpsertSizeInfo = "SizeInfo.Upsert";

        public const string CreatePaymentMethod = "PaymentMethods.Create";

        public const string Development = "Development";
    }
}
