BEGIN TRANSACTION;
GO

ALTER TABLE [SalesOrderLineItems] ADD [Price] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [SalesOrderLineItems] ADD [SalesPrice] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220922132159_UpdateSalesOrderLineItem', N'6.0.4');
GO

COMMIT;
GO

