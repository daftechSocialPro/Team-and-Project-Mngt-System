using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class taskseen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ComplaintId",
                table: "Tasks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSeen",
                table: "Tasks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ComplaintId",
                table: "Tasks",
                column: "ComplaintId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Complaints_ComplaintId",
                table: "Tasks",
                column: "ComplaintId",
                principalTable: "Complaints",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Complaints_ComplaintId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ComplaintId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ComplaintId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "IsSeen",
                table: "Tasks");
        }
    }
}
