BEGIN TRANSACTION;
GO

CREATE SEQUENCE [BillingAddress] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO

CREATE TABLE [BillingAddresses] (
    [Id] int NOT NULL,
    [SalesOrderId] int NOT NULL,
    [FullName] nvarchar(50) NULL,
    [IdNumber] nvarchar(50) NULL,
    [AddressName] nvarchar(50) NOT NULL,
    [Phone] nvarchar(50) NOT NULL,
    [ZipCode] nvarchar(50) NULL,
    [City] nvarchar(50) NOT NULL,
    [District] nvarchar(50) NOT NULL,
    [FullAddress] nvarchar(2500) NOT NULL,
    [CompanyName] nvarchar(50) NULL,
    [Email] nvarchar(50) NOT NULL,
    [TaxNumber] nvarchar(50) NULL,
    [Country] nvarchar(50) NOT NULL,
    [TaxOffice] nvarchar(50) NULL,
    [BillingType] nvarchar(50) NOT NULL DEFAULT N'None',
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_BillingAddresses] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_BillingAddresses_SalesOrders_SalesOrderId] FOREIGN KEY ([SalesOrderId]) REFERENCES [SalesOrders] ([Id]) ON DELETE CASCADE
);
GO

CREATE UNIQUE INDEX [IX_BillingAddresses_SalesOrderId] ON [BillingAddresses] ([SalesOrderId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221105121120_AddBillingAddress', N'6.0.4');
GO

COMMIT;
GO

