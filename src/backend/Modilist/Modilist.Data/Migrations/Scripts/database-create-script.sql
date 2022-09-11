CREATE SEQUENCE [Address] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [FitPreferences_HiLo] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [LineItemFeedback] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [Payment] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [PaymentLineItem] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [PaymentMethod] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [PreferedFabricProperties_HiLo] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [Product] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [ProductImage] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [Return] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [ReturnAddress] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [ReturnLineItem] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [SalesOrder] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [SalesOrderAddress] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [SalesOrderLineItem] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [SizeInfo] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [StylePreferences_HiLo] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [Subscription] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE SEQUENCE [SubscriptionStateLog] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO


CREATE TABLE [Accounts] (
    [Id] uniqueidentifier NOT NULL,
    [SizeInfoId] int NULL,
    [StylePreferencesId] int NULL,
    [PreferedFabricPropertiesId] int NULL,
    [FitPreferencesId] int NULL,
    [SubscriptionId] int NULL,
    [FirstName] nvarchar(50) NULL,
    [LastName] nvarchar(50) NULL,
    [BirthDate] datetime2 NULL,
    [Gender] nvarchar(50) NOT NULL,
    [InstagramUserName] nvarchar(50) NULL,
    [Email] nvarchar(50) NULL,
    [Phone] nvarchar(50) NULL,
    [JobTitle] nvarchar(50) NULL,
    [State] nvarchar(50) NOT NULL,
    [ActivatedAt] datetime2 NULL,
    [DeactivatedAt] datetime2 NULL,
    [BlockedAt] datetime2 NULL,
    [VerifiedAt] datetime2 NULL,
    [IsVerified] bit NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Accounts] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Products] (
    [Id] int NOT NULL,
    [SKU] nvarchar(50) NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [Category] nvarchar(50) NOT NULL,
    [Brand] nvarchar(50) NOT NULL,
    [PriceWithoutVAT] decimal(18,2) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [VAT] int NOT NULL,
    [Size] nvarchar(50) NOT NULL,
    [NonReturnable] bit NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Addresses] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [FirstName] nvarchar(50) NOT NULL,
    [LastName] nvarchar(50) NOT NULL,
    [Phone] nvarchar(50) NOT NULL,
    [ZipCode] nvarchar(50) NULL,
    [Country] nvarchar(50) NOT NULL,
    [City] nvarchar(50) NOT NULL,
    [District] nvarchar(50) NOT NULL,
    [FullAddress] nvarchar(2500) NOT NULL,
    [IsDefault] bit NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Addresses] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Addresses_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [FitPreferences] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [WaistHeight] nvarchar(50) NULL,
    [UpperFit] nvarchar(50) NULL,
    [LowerFit] nvarchar(50) NULL,
    [LegFit] nvarchar(50) NULL,
    [SkirtDressLength] nvarchar(50) NULL,
    [ShortsLength] nvarchar(50) NULL,
    [FootType] nvarchar(50) NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_FitPreferences] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_FitPreferences_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [PaymentMethods] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [CardUserKey] nvarchar(50) NULL,
    [CardHolderName] nvarchar(50) NULL,
    [CardToken] nvarchar(50) NULL,
    [CardAssociation] nvarchar(50) NULL,
    [CardFamily] nvarchar(50) NULL,
    [CardBankName] nvarchar(50) NULL,
    [CardBankCode] bigint NULL,
    [ExpireMonth] nvarchar(50) NULL,
    [ExpireYear] nvarchar(50) NULL,
    [LastFourDigit] nvarchar(50) NULL,
    [CVC] nvarchar(50) NULL,
    [IsDefault] bit NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_PaymentMethods] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PaymentMethods_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [PreferedFabricProperties] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [ExcludedColors] nvarchar(50) NULL,
    [ExcludedColorCategories] nvarchar(50) NULL,
    [ExcludedPatterns] nvarchar(50) NULL,
    [ExcludedFabrics] nvarchar(50) NULL,
    [ExcludedAccessoryColors] nvarchar(50) NULL,
    [Allergens] nvarchar(50) NULL,
    [AdditionalNotes] nvarchar(50) NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_PreferedFabricProperties] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PreferedFabricProperties_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [SalesOrders] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [ReturnId] int NULL,
    [PaymentId] int NULL,
    [State] nvarchar(50) NOT NULL,
    [CargoState] nvarchar(50) NULL,
    [CargoTrackingCode] nvarchar(50) NULL,
    [PreparedAt] datetime2 NULL,
    [ShippedAt] datetime2 NULL,
    [DeliveredAt] datetime2 NULL,
    [CompletedAt] datetime2 NULL,
    [EstimatedDeliveryDate] datetime2 NOT NULL,
    [AdditionalRequests] nvarchar(50) NULL,
    [RequestedStyle] nvarchar(50) NULL,
    [SalesOrderAddressId] int NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_SalesOrders] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SalesOrders_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [SizeInfos] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [BodyType] nvarchar(50) NOT NULL DEFAULT N'None',
    [UpperBody] nvarchar(50) NULL,
    [LowerBody] nvarchar(50) NULL,
    [WomenUnderWearCup] nvarchar(50) NULL,
    [WomenUnderWearSize] nvarchar(50) NULL,
    [MenUnderWear] nvarchar(50) NULL,
    [OutWear] nvarchar(50) NULL,
    [FootWear] nvarchar(50) NULL,
    [Weight] int NOT NULL,
    [Height] int NOT NULL,
    [ShoulderWidth] int NULL,
    [HeadRadius] int NULL,
    [ArmLength] int NULL,
    [BodyLength] int NULL,
    [NeckRadius] int NULL,
    [BreastRadius] int NULL,
    [WaistRadius] int NULL,
    [HipRadius] int NULL,
    [LegLength] int NULL,
    [FootLength] int NULL,
    [AdditionalNotes] nvarchar(50) NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_SizeInfos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SizeInfos_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [StylePreferences] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [ChoiceReasons] nvarchar(1000) NOT NULL,
    [LovesShopping] real NOT NULL DEFAULT CAST(0 AS real),
    [OpenToSuggestions] real NOT NULL DEFAULT CAST(0 AS real),
    [PrefersHijabClothing] bit NOT NULL DEFAULT CAST(0 AS bit),
    [BodyPartsToHighlight] nvarchar(1000) NULL,
    [BodyPartsToHide] nvarchar(1000) NULL,
    [ExcludedUpperCategories] nvarchar(1000) NULL,
    [ExcludedLowerCategories] nvarchar(1000) NULL,
    [ExcludedOuterCategories] nvarchar(1000) NULL,
    [ExcludedUnderwearCategories] nvarchar(1000) NULL,
    [ExcludedAccessoryCategories] nvarchar(1000) NULL,
    [ExcludedFootwearCategories] nvarchar(1000) NULL,
    [ExcludedBagCategories] nvarchar(1000) NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_StylePreferences] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_StylePreferences_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Subscriptions] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [StartedAt] datetime2 NOT NULL,
    [ActivatedAt] datetime2 NULL,
    [SuspendedAt] datetime2 NULL,
    [BlockedAt] datetime2 NULL,
    [ClosedAt] datetime2 NULL,
    [State] int NOT NULL,
    [MaxPricingLimit] nvarchar(50) NOT NULL,
    [MaxPricingLimitAsInt] int NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Subscriptions] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Subscriptions_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [ProductImages] (
    [Id] int NOT NULL,
    [ProductId] int NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    [Name] nvarchar(1000) NOT NULL,
    [Extension] nvarchar(50) NULL,
    [ContentType] nvarchar(50) NOT NULL,
    [Url] nvarchar(2500) NOT NULL,
    [Variants_Thumbnail] nvarchar(50) NULL,
    [Variants_XSmall] nvarchar(50) NULL,
    [Variants_Small] nvarchar(50) NULL,
    [Variants_Medium] nvarchar(50) NULL,
    [Variants_Large] nvarchar(50) NULL,
    [Variants_XLarge] nvarchar(50) NULL,
    CONSTRAINT [PK_ProductImages] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ProductImages_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Payments] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [SalesOrderId] int NOT NULL,
    [TotalPrice] decimal(18,2) NOT NULL,
    [TotalPriceWithoutVAT] decimal(18,2) NOT NULL,
    [TotalDiscount] decimal(18,2) NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Payments] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Payments_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Payments_SalesOrders_SalesOrderId] FOREIGN KEY ([SalesOrderId]) REFERENCES [SalesOrders] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [Returns] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [SalesOrderId] int NOT NULL,
    [ReturnAddressId] int NULL,
    [RequestedPickupDate] datetime2 NOT NULL,
    [State] nvarchar(50) NOT NULL,
    [CargoState] nvarchar(50) NULL,
    [CargoTrackingCode] nvarchar(50) NULL,
    [PickedAt] datetime2 NULL,
    [DeliveredAt] datetime2 NULL,
    [ReviewedAt] datetime2 NULL,
    [CompletedAt] datetime2 NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Returns] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Returns_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Returns_SalesOrders_SalesOrderId] FOREIGN KEY ([SalesOrderId]) REFERENCES [SalesOrders] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [SalesOrderAddresses] (
    [Id] int NOT NULL,
    [SalesOrderId] int NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [FirstName] nvarchar(50) NOT NULL,
    [LastName] nvarchar(50) NOT NULL,
    [Phone] nvarchar(50) NOT NULL,
    [ZipCode] nvarchar(50) NULL,
    [Country] nvarchar(50) NOT NULL,
    [City] nvarchar(50) NOT NULL,
    [District] nvarchar(50) NOT NULL,
    [FullAddress] nvarchar(2500) NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_SalesOrderAddresses] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SalesOrderAddresses_SalesOrders_SalesOrderId] FOREIGN KEY ([SalesOrderId]) REFERENCES [SalesOrders] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [SalesOrderLineItems] (
    [Id] int NOT NULL,
    [SalesOrderId] int NOT NULL,
    [State] nvarchar(50) NOT NULL DEFAULT N'None',
    [LineItemFeedbackId] int NULL,
    [ProductId] int NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_SalesOrderLineItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SalesOrderLineItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_SalesOrderLineItems_SalesOrders_SalesOrderId] FOREIGN KEY ([SalesOrderId]) REFERENCES [SalesOrders] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [SubscriptionStateLogs] (
    [Id] int NOT NULL,
    [SubscriptionId] int NOT NULL,
    [PreviousState] int NOT NULL,
    [CurrentState] int NOT NULL,
    [SuspentionReasons] nvarchar(max) NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_SubscriptionStateLogs] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SubscriptionStateLogs_Subscriptions_SubscriptionId] FOREIGN KEY ([SubscriptionId]) REFERENCES [Subscriptions] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [PaymentLineItems] (
    [Id] int NOT NULL,
    [PaymentId] int NOT NULL,
    [ProductId] int NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [PriceWithoutVAT] decimal(18,2) NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_PaymentLineItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PaymentLineItems_Payments_PaymentId] FOREIGN KEY ([PaymentId]) REFERENCES [Payments] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PaymentLineItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [ReturnAddresses] (
    [Id] int NOT NULL,
    [ReturnId] int NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [FirstName] nvarchar(50) NOT NULL,
    [LastName] nvarchar(50) NOT NULL,
    [Phone] nvarchar(50) NOT NULL,
    [ZipCode] nvarchar(50) NULL,
    [City] nvarchar(50) NOT NULL,
    [District] nvarchar(50) NOT NULL,
    [FullAddress] nvarchar(2500) NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_ReturnAddresses] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ReturnAddresses_Returns_ReturnId] FOREIGN KEY ([ReturnId]) REFERENCES [Returns] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [ReturnLineItems] (
    [Id] int NOT NULL,
    [ReturnId] int NOT NULL,
    [ProductId] int NOT NULL,
    [State] nvarchar(50) NOT NULL DEFAULT N'None',
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_ReturnLineItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ReturnLineItems_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ReturnLineItems_Returns_ReturnId] FOREIGN KEY ([ReturnId]) REFERENCES [Returns] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [LineItemFeedbacks] (
    [Id] int NOT NULL,
    [SalesOrderLineItemId] int NOT NULL,
    [Price] real NOT NULL,
    [Size] int NOT NULL,
    [Style] real NOT NULL,
    [Fit] real NOT NULL,
    [Color] real NOT NULL,
    [Quality] real NOT NULL,
    [Fabric] real NOT NULL,
    [Pattern] real NOT NULL,
    [PerfectMatch] real NOT NULL,
    [SendSimilarProducts] bit NOT NULL,
    [Brand] real NOT NULL,
    [AdditionalNotes] nvarchar(2500) NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_LineItemFeedbacks] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_LineItemFeedbacks_SalesOrderLineItems_SalesOrderLineItemId] FOREIGN KEY ([SalesOrderLineItemId]) REFERENCES [SalesOrderLineItems] ([Id]) ON DELETE CASCADE
);
GO


CREATE UNIQUE INDEX [IX_Accounts_Email_DeletedAt] ON [Accounts] ([Email], [DeletedAt]) WHERE [Email] IS NOT NULL AND [DeletedAt] IS NULL;
GO


CREATE UNIQUE INDEX [IX_Addresses_AccountId_Name_DeletedAt] ON [Addresses] ([AccountId], [Name], [DeletedAt]) WHERE [DeletedAt] IS NULL;
GO


CREATE UNIQUE INDEX [IX_FitPreferences_AccountId] ON [FitPreferences] ([AccountId]);
GO


CREATE UNIQUE INDEX [IX_LineItemFeedbacks_SalesOrderLineItemId] ON [LineItemFeedbacks] ([SalesOrderLineItemId]);
GO


CREATE INDEX [IX_PaymentLineItems_PaymentId] ON [PaymentLineItems] ([PaymentId]);
GO


CREATE INDEX [IX_PaymentLineItems_ProductId] ON [PaymentLineItems] ([ProductId]);
GO


CREATE UNIQUE INDEX [IX_PaymentMethods_AccountId_CardUserKey_DeletedAt] ON [PaymentMethods] ([AccountId], [CardUserKey], [DeletedAt]) WHERE [CardUserKey] IS NOT NULL AND [DeletedAt] IS NULL;
GO


CREATE INDEX [IX_Payments_AccountId] ON [Payments] ([AccountId]);
GO


CREATE UNIQUE INDEX [IX_Payments_SalesOrderId] ON [Payments] ([SalesOrderId]);
GO


CREATE UNIQUE INDEX [IX_PreferedFabricProperties_AccountId] ON [PreferedFabricProperties] ([AccountId]);
GO


CREATE INDEX [IX_ProductImages_ProductId] ON [ProductImages] ([ProductId]);
GO


CREATE UNIQUE INDEX [IX_Products_SKU_DeletedAt] ON [Products] ([SKU], [DeletedAt]) WHERE [DeletedAt] IS NULL;
GO


CREATE UNIQUE INDEX [IX_ReturnAddresses_ReturnId] ON [ReturnAddresses] ([ReturnId]);
GO


CREATE INDEX [IX_ReturnLineItems_ProductId] ON [ReturnLineItems] ([ProductId]);
GO


CREATE INDEX [IX_ReturnLineItems_ReturnId] ON [ReturnLineItems] ([ReturnId]);
GO


CREATE INDEX [IX_Returns_AccountId] ON [Returns] ([AccountId]);
GO


CREATE UNIQUE INDEX [IX_Returns_SalesOrderId] ON [Returns] ([SalesOrderId]);
GO


CREATE UNIQUE INDEX [IX_SalesOrderAddresses_SalesOrderId] ON [SalesOrderAddresses] ([SalesOrderId]);
GO


CREATE INDEX [IX_SalesOrderLineItems_ProductId] ON [SalesOrderLineItems] ([ProductId]);
GO


CREATE INDEX [IX_SalesOrderLineItems_SalesOrderId] ON [SalesOrderLineItems] ([SalesOrderId]);
GO


CREATE INDEX [IX_SalesOrders_AccountId] ON [SalesOrders] ([AccountId]);
GO


CREATE UNIQUE INDEX [IX_SizeInfos_AccountId] ON [SizeInfos] ([AccountId]);
GO


CREATE UNIQUE INDEX [IX_StylePreferences_AccountId] ON [StylePreferences] ([AccountId]);
GO


CREATE UNIQUE INDEX [IX_Subscriptions_AccountId] ON [Subscriptions] ([AccountId]);
GO


CREATE INDEX [IX_SubscriptionStateLogs_SubscriptionId] ON [SubscriptionStateLogs] ([SubscriptionId]);
GO


