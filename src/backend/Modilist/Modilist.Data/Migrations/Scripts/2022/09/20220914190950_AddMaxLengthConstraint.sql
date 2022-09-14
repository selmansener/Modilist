BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[SizeInfos]') AND [c].[name] = N'AdditionalNotes');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [SizeInfos] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [SizeInfos] ALTER COLUMN [AdditionalNotes] nvarchar(4000) NULL;
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[SalesOrders]') AND [c].[name] = N'AdditionalRequests');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [SalesOrders] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [SalesOrders] ALTER COLUMN [AdditionalRequests] nvarchar(4000) NULL;
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PreferedFabricProperties]') AND [c].[name] = N'Allergens');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [PreferedFabricProperties] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [PreferedFabricProperties] ALTER COLUMN [Allergens] nvarchar(4000) NULL;
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PreferedFabricProperties]') AND [c].[name] = N'AdditionalNotes');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [PreferedFabricProperties] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [PreferedFabricProperties] ALTER COLUMN [AdditionalNotes] nvarchar(4000) NULL;
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[LineItemFeedbacks]') AND [c].[name] = N'AdditionalNotes');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [LineItemFeedbacks] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [LineItemFeedbacks] ALTER COLUMN [AdditionalNotes] nvarchar(4000) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220914192402_AddMaxLengthConstraint', N'6.0.4');
GO

COMMIT;
GO

