BEGIN TRANSACTION;
GO

ALTER TABLE [PaymentLineItems] ADD [PaymentTransactionId] nvarchar(50) NOT NULL DEFAULT N'';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220910145532_AddPaymentTransactionId', N'6.0.4');
GO

COMMIT;
GO

