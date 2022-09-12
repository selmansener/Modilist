using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Modilist.Data.Migrations._2022._09
{
    public partial class AddDiscountDomain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "Discount",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ExpireDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DiscountValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExclusiveDiscounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InvitedAccountEmail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExclusiveDiscounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExclusiveDiscounts_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExclusiveDiscounts_Discounts_Id",
                        column: x => x.Id,
                        principalTable: "Discounts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PublicDiscounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    MaxLimit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicDiscounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PublicDiscounts_Discounts_Id",
                        column: x => x.Id,
                        principalTable: "Discounts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PublicDiscountAccount",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PublicDiscountId = table.Column<int>(type: "int", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedById = table.Column<int>(type: "int", nullable: false),
                    UpdatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicDiscountAccount", x => new { x.AccountId, x.PublicDiscountId });
                    table.ForeignKey(
                        name: "FK_PublicDiscountAccount_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PublicDiscountAccount_PublicDiscounts_PublicDiscountId",
                        column: x => x.PublicDiscountId,
                        principalTable: "PublicDiscounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExclusiveDiscounts_AccountId",
                table: "ExclusiveDiscounts",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicDiscountAccount_PublicDiscountId",
                table: "PublicDiscountAccount",
                column: "PublicDiscountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExclusiveDiscounts");

            migrationBuilder.DropTable(
                name: "PublicDiscountAccount");

            migrationBuilder.DropTable(
                name: "PublicDiscounts");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropSequence(
                name: "Discount");
        }
    }
}
