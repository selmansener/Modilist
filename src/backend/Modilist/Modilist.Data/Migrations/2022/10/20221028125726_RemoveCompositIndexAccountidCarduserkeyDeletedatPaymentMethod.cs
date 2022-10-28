using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modilist.Data.Migrations._2022._10
{
    public partial class RemoveCompositIndexAccountidCarduserkeyDeletedatPaymentMethod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PaymentMethods_AccountId_CardUserKey_DeletedAt",
                table: "PaymentMethods");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_AccountId_CardName_DeletedAt",
                table: "PaymentMethods",
                columns: new[] { "AccountId", "CardName", "DeletedAt" },
                unique: true,
                filter: "[CardName] IS NOT NULL AND [DeletedAt] IS NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PaymentMethods_AccountId_CardName_DeletedAt",
                table: "PaymentMethods");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_AccountId_CardUserKey_DeletedAt",
                table: "PaymentMethods",
                columns: new[] { "AccountId", "CardUserKey", "DeletedAt" },
                unique: true,
                filter: "[CardUserKey] IS NOT NULL AND [DeletedAt] IS NULL");
        }
    }
}
