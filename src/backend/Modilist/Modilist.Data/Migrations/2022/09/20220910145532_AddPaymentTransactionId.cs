using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modilist.Data.Migrations._2022._09
{
    public partial class AddPaymentTransactionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentTransactionId",
                table: "PaymentLineItems",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentTransactionId",
                table: "PaymentLineItems");
        }
    }
}
