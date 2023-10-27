using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class ss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ComplaintListId",
                table: "Employees",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ComplaintListId",
                table: "Employees",
                column: "ComplaintListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Complaints_ComplaintListId",
                table: "Employees",
                column: "ComplaintListId",
                principalTable: "Complaints",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Complaints_ComplaintListId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_ComplaintListId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "ComplaintListId",
                table: "Employees");
        }
    }
}
