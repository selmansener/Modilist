BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PaymentMethods]') AND [c].[name] = N'CVC');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [PaymentMethods] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [PaymentMethods] DROP COLUMN [CVC];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PaymentMethods]') AND [c].[name] = N'CardHolderName');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [PaymentMethods] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [PaymentMethods] DROP COLUMN [CardHolderName];
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PaymentMethods]') AND [c].[name] = N'ExpireMonth');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [PaymentMethods] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [PaymentMethods] DROP COLUMN [ExpireMonth];
GO

EXEC sp_rename N'[PaymentMethods].[LastFourDigit]', N'CardName', N'COLUMN';
GO

EXEC sp_rename N'[PaymentMethods].[ExpireYear]', N'BinNumber', N'COLUMN';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220915075530_RefactorPaymentMethod', N'6.0.4');
GO

COMMIT;
GO

