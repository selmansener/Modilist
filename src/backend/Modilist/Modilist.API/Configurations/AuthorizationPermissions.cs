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

        public const string GetPreferedFabricProperties = "PreferedFabricProperties.Get";
        public const string UpsertPreferedFabricProperties = "PreferedFabricProperties.Upsert";

        public const string GetFitPreferences = "FitPreferences.Get";
        public const string UpsertFitPreferences = "FitPreferences.Upsert";

        public const string CreatePaymentMethod = "PaymentMethods.Create";

        public const string GetSubscriptions = "Subscriptions.Get";
        public const string CreateSubscriptions = "Subscriptions.Create";
        public const string UpdateSubscriptions = "Subscriptions.Update";

        public const string GetProducts = "Products.Get";
        public const string CreateProducts = "Products.Create";
        public const string UpdateProducts = "Products.Update";

        public const string GetSalesOrders = "SalesOrders.Get";
        public const string CreateSalesOrders = "SalesOrders.Create";
        public const string UpdateSalesOrders = "SalesOrders.Update";

        public const string Development = "Development";
    }
}
