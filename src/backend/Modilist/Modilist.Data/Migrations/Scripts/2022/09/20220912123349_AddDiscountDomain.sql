BEGIN TRANSACTION;
GO

CREATE SEQUENCE [Discount] START WITH 1 INCREMENT BY 10 NO MINVALUE NO MAXVALUE NO CYCLE;
GO

CREATE TABLE [Discounts] (
    [Id] int NOT NULL,
    [State] nvarchar(50) NOT NULL,
    [Type] nvarchar(50) NOT NULL,
    [ExpireDate] datetime2 NULL,
    [DiscountValue] decimal(18,2) NOT NULL,
    [Currency] nvarchar(50) NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_Discounts] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [ExclusiveDiscounts] (
    [Id] int NOT NULL,
    [AccountId] uniqueidentifier NOT NULL,
    [InvitedAccountEmail] nvarchar(50) NULL,
    CONSTRAINT [PK_ExclusiveDiscounts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ExclusiveDiscounts_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ExclusiveDiscounts_Discounts_Id] FOREIGN KEY ([Id]) REFERENCES [Discounts] ([Id])
);
GO

CREATE TABLE [PublicDiscounts] (
    [Id] int NOT NULL,
    [MaxLimit] int NOT NULL,
    CONSTRAINT [PK_PublicDiscounts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PublicDiscounts_Discounts_Id] FOREIGN KEY ([Id]) REFERENCES [Discounts] ([Id])
);
GO

CREATE TABLE [PublicDiscountAccount] (
    [AccountId] uniqueidentifier NOT NULL,
    [PublicDiscountId] int NOT NULL,
    [DeletedAt] datetime2 NULL,
    [UpdatedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [DeletedById] int NOT NULL,
    [UpdatedById] int NOT NULL,
    [CreatedById] int NOT NULL,
    CONSTRAINT [PK_PublicDiscountAccount] PRIMARY KEY ([AccountId], [PublicDiscountId]),
    CONSTRAINT [FK_PublicDiscountAccount_Accounts_AccountId] FOREIGN KEY ([AccountId]) REFERENCES [Accounts] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PublicDiscountAccount_PublicDiscounts_PublicDiscountId] FOREIGN KEY ([PublicDiscountId]) REFERENCES [PublicDiscounts] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_ExclusiveDiscounts_AccountId] ON [ExclusiveDiscounts] ([AccountId]);
GO

CREATE INDEX [IX_PublicDiscountAccount_PublicDiscountId] ON [PublicDiscountAccount] ([PublicDiscountId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220912123349_AddDiscountDomain', N'6.0.4');
GO

COMMIT;
GO

