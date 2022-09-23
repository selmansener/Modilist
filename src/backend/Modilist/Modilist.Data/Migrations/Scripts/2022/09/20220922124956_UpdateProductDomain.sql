BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Products].[PriceWithoutVAT]', N'SalesPrice', N'COLUMN';
GO

EXEC sp_rename N'[Payments].[TotalPriceWithoutVAT]', N'TotalSalesPrice', N'COLUMN';
GO

EXEC sp_rename N'[PaymentLineItems].[PriceWithoutVAT]', N'SalesPrice', N'COLUMN';
GO

ALTER TABLE [Products] ADD [Gender] nvarchar(50) NOT NULL DEFAULT N'';
GO

ALTER TABLE [Products] ADD [ProfitRate] int NOT NULL DEFAULT 0;
GO

ALTER TABLE [Products] ADD [PurchasePrice] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [Products] ADD [SubCategory] nvarchar(50) NOT NULL DEFAULT N'';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220922124956_UpdateProductDomain', N'6.0.4');
GO

COMMIT;
GO

