using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modilist.Data.Migrations._2022._09
{
    public partial class RefactorPaymentMethod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CVC",
                table: "PaymentMethods");

            migrationBuilder.DropColumn(
                name: "CardHolderName",
                table: "PaymentMethods");

            migrationBuilder.DropColumn(
                name: "ExpireMonth",
                table: "PaymentMethods");

            migrationBuilder.RenameColumn(
                name: "LastFourDigit",
                table: "PaymentMethods",
                newName: "CardName");

            migrationBuilder.RenameColumn(
                name: "ExpireYear",
                table: "PaymentMethods",
                newName: "BinNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CardName",
                table: "PaymentMethods",
                newName: "LastFourDigit");

            migrationBuilder.RenameColumn(
                name: "BinNumber",
                table: "PaymentMethods",
                newName: "ExpireYear");

            migrationBuilder.AddColumn<string>(
                name: "CVC",
                table: "PaymentMethods",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardHolderName",
                table: "PaymentMethods",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpireMonth",
                table: "PaymentMethods",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
