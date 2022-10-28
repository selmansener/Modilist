BEGIN TRANSACTION;
GO

DROP INDEX [IX_PaymentMethods_AccountId_CardUserKey_DeletedAt] ON [PaymentMethods];
GO

CREATE UNIQUE INDEX [IX_PaymentMethods_AccountId_CardName_DeletedAt] ON [PaymentMethods] ([AccountId], [CardName], [DeletedAt]) WHERE [CardName] IS NOT NULL AND [DeletedAt] IS NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221028125726_RemoveCompositIndexAccountidCarduserkeyDeletedatPaymentMethod', N'6.0.4');
GO

COMMIT;
GO

