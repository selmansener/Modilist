BEGIN TRANSACTION;
GO

ALTER TABLE [Subscriptions] ADD [Plan] nvarchar(50) NOT NULL DEFAULT N'InEveryMonth';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221020150801_AddSubscriptionPlan', N'6.0.4');
GO

COMMIT;
GO

