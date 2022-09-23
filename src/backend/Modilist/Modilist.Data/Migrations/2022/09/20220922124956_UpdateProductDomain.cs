using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modilist.Data.Migrations._2022._09
{
    public partial class UpdateProductDomain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PriceWithoutVAT",
                table: "Products",
                newName: "SalesPrice");

            migrationBuilder.RenameColumn(
                name: "TotalPriceWithoutVAT",
                table: "Payments",
                newName: "TotalSalesPrice");

            migrationBuilder.RenameColumn(
                name: "PriceWithoutVAT",
                table: "PaymentLineItems",
                newName: "SalesPrice");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Products",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProfitRate",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PurchasePrice",
                table: "Products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "SubCategory",
                table: "Products",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProfitRate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PurchasePrice",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SubCategory",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "SalesPrice",
                table: "Products",
                newName: "PriceWithoutVAT");

            migrationBuilder.RenameColumn(
                name: "TotalSalesPrice",
                table: "Payments",
                newName: "TotalPriceWithoutVAT");

            migrationBuilder.RenameColumn(
                name: "SalesPrice",
                table: "PaymentLineItems",
                newName: "PriceWithoutVAT");
        }
    }
}
