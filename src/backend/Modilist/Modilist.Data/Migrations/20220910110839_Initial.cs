using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modilist.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "Address",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "FitPreferences_HiLo",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "LineItemFeedback",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "Payment",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "PaymentLineItem",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "PaymentMethod",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "PreferedFabricProperties_HiLo",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "Product",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "ProductImage",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "Return",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "ReturnAddress",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "ReturnLineItem",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "SalesOrder",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "SalesOrderAddress",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "SalesOrderLineItem",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "SizeInfo",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "StylePreferences_HiLo",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "Subscription",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "SubscriptionStateLog",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SizeInfoId = table.Column<int>(type: "int", nullable: true),
                    StylePreferencesId = table.Column<int>(type: "int", nullable: true),
                    PreferedFabricPropertiesId = table.Column<int>(type: "int", nullable: true),
                    FitPreferencesId = table.Column<int>(type: "int", nullable: true),
                    SubscriptionId = table.Column<int>(type: "int", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    InstagramUserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    JobTitle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ActivatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeactivatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BlockedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    SKU = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PriceWithoutVAT = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VAT = table.Column<int>(type: "int", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NonReturnable = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ZipCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    District = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FullAddress = table.Column<string>(type: "nvarchar(2500)", maxLength: 2500, nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FitPreferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WaistHeight = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpperFit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LowerFit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LegFit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SkirtDressLength = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ShortsLength = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    FootType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FitPreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FitPreferences_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CardUserKey = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CardHolderName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CardToken = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CardAssociation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CardFamily = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CardBankName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CardBankCode = table.Column<long>(type: "bigint", nullable: true),
                    ExpireMonth = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ExpireYear = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastFourDigit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CVC = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentMethods_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PreferedFabricProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExcludedColors = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ExcludedColorCategories = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ExcludedPatterns = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ExcludedFabrics = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ExcludedAccessoryColors = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Allergens = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AdditionalNotes = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreferedFabricProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PreferedFabricProperties_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReturnId = table.Column<int>(type: "int", nullable: true),
                    PaymentId = table.Column<int>(type: "int", nullable: true),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CargoState = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CargoTrackingCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PreparedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ShippedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeliveredAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EstimatedDeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdditionalRequests = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RequestedStyle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SalesOrderAddressId = table.Column<int>(type: "int", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalesOrders_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SizeInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BodyType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false, defaultValue: "None"),
                    UpperBody = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LowerBody = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    WomenUnderWearCup = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    WomenUnderWearSize = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MenUnderWear = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    OutWear = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    FootWear = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false),
                    ShoulderWidth = table.Column<int>(type: "int", nullable: true),
                    HeadRadius = table.Column<int>(type: "int", nullable: true),
                    ArmLength = table.Column<int>(type: "int", nullable: true),
                    BodyLength = table.Column<int>(type: "int", nullable: true),
                    NeckRadius = table.Column<int>(type: "int", nullable: true),
                    BreastRadius = table.Column<int>(type: "int", nullable: true),
                    WaistRadius = table.Column<int>(type: "int", nullable: true),
                    HipRadius = table.Column<int>(type: "int", nullable: true),
                    LegLength = table.Column<int>(type: "int", nullable: true),
                    FootLength = table.Column<int>(type: "int", nullable: true),
                    AdditionalNotes = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SizeInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SizeInfos_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StylePreferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ChoiceReasons = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    LovesShopping = table.Column<float>(type: "real", nullable: false, defaultValue: 0f),
                    OpenToSuggestions = table.Column<float>(type: "real", nullable: false, defaultValue: 0f),
                    PrefersHijabClothing = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    BodyPartsToHighlight = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    BodyPartsToHide = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedUpperCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedLowerCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedOuterCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedUnderwearCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedAccessoryCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedFootwearCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExcludedBagCategories = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StylePreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StylePreferences_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ActivatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SuspendedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BlockedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClosedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    State = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    MaxPricingLimit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaxPricingLimitAsInt = table.Column<int>(type: "int", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Extension = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ContentType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(2500)", maxLength: 2500, nullable: false),
                    Variants_Thumbnail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Variants_XSmall = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Variants_Small = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Variants_Medium = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Variants_Large = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Variants_XLarge = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductImages_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SalesOrderId = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPriceWithoutVAT = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalDiscount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_SalesOrders_SalesOrderId",
                        column: x => x.SalesOrderId,
                        principalTable: "SalesOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Returns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SalesOrderId = table.Column<int>(type: "int", nullable: false),
                    ReturnAddressId = table.Column<int>(type: "int", nullable: true),
                    RequestedPickupDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CargoState = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CargoTrackingCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PickedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeliveredAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReviewedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Returns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Returns_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Returns_SalesOrders_SalesOrderId",
                        column: x => x.SalesOrderId,
                        principalTable: "SalesOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrderAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    SalesOrderId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ZipCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    District = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FullAddress = table.Column<string>(type: "nvarchar(2500)", maxLength: 2500, nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrderAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalesOrderAddresses_SalesOrders_SalesOrderId",
                        column: x => x.SalesOrderId,
                        principalTable: "SalesOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrderLineItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    SalesOrderId = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false, defaultValue: "None"),
                    LineItemFeedbackId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrderLineItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalesOrderLineItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SalesOrderLineItems_SalesOrders_SalesOrderId",
                        column: x => x.SalesOrderId,
                        principalTable: "SalesOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionStateLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    SubscriptionId = table.Column<int>(type: "int", nullable: false),
                    PreviousState = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    CurrentState = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    SuspentionReasons = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionStateLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionStateLogs_Subscriptions_SubscriptionId",
                        column: x => x.SubscriptionId,
                        principalTable: "Subscriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentLineItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    PaymentId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PriceWithoutVAT = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentLineItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentLineItems_Payments_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Payments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentLineItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReturnAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ReturnId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ZipCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    City = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    District = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FullAddress = table.Column<string>(type: "nvarchar(2500)", maxLength: 2500, nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReturnAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReturnAddresses_Returns_ReturnId",
                        column: x => x.ReturnId,
                        principalTable: "Returns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReturnLineItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ReturnId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false, defaultValue: "None"),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReturnLineItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReturnLineItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReturnLineItems_Returns_ReturnId",
                        column: x => x.ReturnId,
                        principalTable: "Returns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LineItemFeedbacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    SalesOrderLineItemId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Size = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Style = table.Column<float>(type: "real", nullable: false),
                    Fit = table.Column<float>(type: "real", nullable: false),
                    Color = table.Column<float>(type: "real", nullable: false),
                    Quality = table.Column<float>(type: "real", nullable: false),
                    Fabric = table.Column<float>(type: "real", nullable: false),
                    Pattern = table.Column<float>(type: "real", nullable: false),
                    PerfectMatch = table.Column<float>(type: "real", nullable: false),
                    SendSimilarProducts = table.Column<bool>(type: "bit", nullable: false),
                    Brand = table.Column<float>(type: "real", nullable: false),
                    AdditionalNotes = table.Column<string>(type: "nvarchar(2500)", maxLength: 2500, nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LineItemFeedbacks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LineItemFeedbacks_SalesOrderLineItems_SalesOrderLineItemId",
                        column: x => x.SalesOrderLineItemId,
                        principalTable: "SalesOrderLineItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Email_DeletedAt",
                table: "Accounts",
                columns: new[] { "Email", "DeletedAt" },
                unique: true,
                filter: "[Email] IS NOT NULL AND [DeletedAt] IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_AccountId_Name_DeletedAt",
                table: "Addresses",
                columns: new[] { "AccountId", "Name", "DeletedAt" },
                unique: true,
                filter: "[DeletedAt] IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_FitPreferences_AccountId",
                table: "FitPreferences",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LineItemFeedbacks_SalesOrderLineItemId",
                table: "LineItemFeedbacks",
                column: "SalesOrderLineItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PaymentLineItems_PaymentId",
                table: "PaymentLineItems",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentLineItems_ProductId",
                table: "PaymentLineItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_AccountId_CardUserKey_DeletedAt",
                table: "PaymentMethods",
                columns: new[] { "AccountId", "CardUserKey", "DeletedAt" },
                unique: true,
                filter: "[CardUserKey] IS NOT NULL AND [DeletedAt] IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_AccountId",
                table: "Payments",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_SalesOrderId",
                table: "Payments",
                column: "SalesOrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PreferedFabricProperties_AccountId",
                table: "PreferedFabricProperties",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_ProductId",
                table: "ProductImages",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SKU_DeletedAt",
                table: "Products",
                columns: new[] { "SKU", "DeletedAt" },
                unique: true,
                filter: "[DeletedAt] IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnAddresses_ReturnId",
                table: "ReturnAddresses",
                column: "ReturnId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReturnLineItems_ProductId",
                table: "ReturnLineItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnLineItems_ReturnId",
                table: "ReturnLineItems",
                column: "ReturnId");

            migrationBuilder.CreateIndex(
                name: "IX_Returns_AccountId",
                table: "Returns",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Returns_SalesOrderId",
                table: "Returns",
                column: "SalesOrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderAddresses_SalesOrderId",
                table: "SalesOrderAddresses",
                column: "SalesOrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderLineItems_ProductId",
                table: "SalesOrderLineItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderLineItems_SalesOrderId",
                table: "SalesOrderLineItems",
                column: "SalesOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrders_AccountId",
                table: "SalesOrders",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_SizeInfos_AccountId",
                table: "SizeInfos",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StylePreferences_AccountId",
                table: "StylePreferences",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_AccountId",
                table: "Subscriptions",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionStateLogs_SubscriptionId",
                table: "SubscriptionStateLogs",
                column: "SubscriptionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "FitPreferences");

            migrationBuilder.DropTable(
                name: "LineItemFeedbacks");

            migrationBuilder.DropTable(
                name: "PaymentLineItems");

            migrationBuilder.DropTable(
                name: "PaymentMethods");

            migrationBuilder.DropTable(
                name: "PreferedFabricProperties");

            migrationBuilder.DropTable(
                name: "ProductImages");

            migrationBuilder.DropTable(
                name: "ReturnAddresses");

            migrationBuilder.DropTable(
                name: "ReturnLineItems");

            migrationBuilder.DropTable(
                name: "SalesOrderAddresses");

            migrationBuilder.DropTable(
                name: "SizeInfos");

            migrationBuilder.DropTable(
                name: "StylePreferences");

            migrationBuilder.DropTable(
                name: "SubscriptionStateLogs");

            migrationBuilder.DropTable(
                name: "SalesOrderLineItems");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Returns");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "SalesOrders");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropSequence(
                name: "Address");

            migrationBuilder.DropSequence(
                name: "FitPreferences_HiLo");

            migrationBuilder.DropSequence(
                name: "LineItemFeedback");

            migrationBuilder.DropSequence(
                name: "Payment");

            migrationBuilder.DropSequence(
                name: "PaymentLineItem");

            migrationBuilder.DropSequence(
                name: "PaymentMethod");

            migrationBuilder.DropSequence(
                name: "PreferedFabricProperties_HiLo");

            migrationBuilder.DropSequence(
                name: "Product");

            migrationBuilder.DropSequence(
                name: "ProductImage");

            migrationBuilder.DropSequence(
                name: "Return");

            migrationBuilder.DropSequence(
                name: "ReturnAddress");

            migrationBuilder.DropSequence(
                name: "ReturnLineItem");

            migrationBuilder.DropSequence(
                name: "SalesOrder");

            migrationBuilder.DropSequence(
                name: "SalesOrderAddress");

            migrationBuilder.DropSequence(
                name: "SalesOrderLineItem");

            migrationBuilder.DropSequence(
                name: "SizeInfo");

            migrationBuilder.DropSequence(
                name: "StylePreferences_HiLo");

            migrationBuilder.DropSequence(
                name: "Subscription");

            migrationBuilder.DropSequence(
                name: "SubscriptionStateLog");
        }
    }
}
