BEGIN TRANSACTION;
GO

ALTER TABLE [SalesOrders] ADD [MaxPricingLimit] nvarchar(50) NOT NULL DEFAULT N'';
GO

ALTER TABLE [SalesOrders] ADD [MaxPricingLimitAsInt] int NOT NULL DEFAULT 0;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221110135443_SalesOrderMaxPricing', N'6.0.4');
GO

COMMIT;
GO

