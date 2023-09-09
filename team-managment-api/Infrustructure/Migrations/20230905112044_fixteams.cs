using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class fixteams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Teams_TeamId",
                table: "Projects");

            

            migrationBuilder.DropIndex(
                name: "IX_Projects_TeamId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Projects");

            migrationBuilder.AlterColumn<Guid>(
                name: "PTeamId",
                table: "TeamProjects",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamProjects_Teams_PTeamId",
                table: "TeamProjects");

            migrationBuilder.AlterColumn<Guid>(
                name: "PTeamId",
                table: "TeamProjects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_TeamId",
                table: "Projects",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Teams_TeamId",
                table: "Projects",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamProjects_Teams_PTeamId",
                table: "TeamProjects",
                column: "PTeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
