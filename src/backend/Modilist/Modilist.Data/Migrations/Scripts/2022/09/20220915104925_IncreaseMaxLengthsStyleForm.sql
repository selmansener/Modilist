BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PreferedFabricProperties]') AND [c].[name] = N'ExcludedPatterns');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [PreferedFabricProperties] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [PreferedFabricProperties] ALTER COLUMN [ExcludedPatterns] nvarchar(1000) NULL;
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PreferedFabricProperties]') AND [c].[name] = N'ExcludedFabrics');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [PreferedFabricProperties] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [PreferedFabricProperties] ALTER COLUMN [ExcludedFabrics] nvarchar(1000) NULL;
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PreferedFabricProperties]') AND [c].[name] = N'ExcludedColors');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [PreferedFabricProperties] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [PreferedFabricProperties] ALTER COLUMN [ExcludedColors] nvarchar(1000) NULL;
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[PreferedFabricProperties]') AND [c].[name] = N'ExcludedColorCategories');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [PreferedFabricProperties] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [PreferedFabricProperties] ALTER COLUMN [ExcludedColorCategories] nvarchar(1000) NULL;
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[FitPreferences]') AND [c].[name] = N'UpperFit');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [FitPreferences] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [FitPreferences] ALTER COLUMN [UpperFit] nvarchar(1000) NULL;
GO

DECLARE @var5 sysname;
SELECT @var5 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[FitPreferences]') AND [c].[name] = N'SkirtDressLength');
IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [FitPreferences] DROP CONSTRAINT [' + @var5 + '];');
ALTER TABLE [FitPreferences] ALTER COLUMN [SkirtDressLength] nvarchar(1000) NULL;
GO

DECLARE @var6 sysname;
SELECT @var6 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[FitPreferences]') AND [c].[name] = N'ShortsLength');
IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [FitPreferences] DROP CONSTRAINT [' + @var6 + '];');
ALTER TABLE [FitPreferences] ALTER COLUMN [ShortsLength] nvarchar(1000) NULL;
GO

DECLARE @var7 sysname;
SELECT @var7 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[FitPreferences]') AND [c].[name] = N'LowerFit');
IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [FitPreferences] DROP CONSTRAINT [' + @var7 + '];');
ALTER TABLE [FitPreferences] ALTER COLUMN [LowerFit] nvarchar(1000) NULL;
GO

DECLARE @var8 sysname;
SELECT @var8 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[FitPreferences]') AND [c].[name] = N'LegFit');
IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [FitPreferences] DROP CONSTRAINT [' + @var8 + '];');
ALTER TABLE [FitPreferences] ALTER COLUMN [LegFit] nvarchar(1000) NULL;
GO

DECLARE @var9 sysname;
SELECT @var9 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[FitPreferences]') AND [c].[name] = N'FootType');
IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [FitPreferences] DROP CONSTRAINT [' + @var9 + '];');
ALTER TABLE [FitPreferences] ALTER COLUMN [FootType] nvarchar(1000) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220915104925_IncreaseMaxLengthsStyleForm', N'6.0.4');
GO

COMMIT;
GO

