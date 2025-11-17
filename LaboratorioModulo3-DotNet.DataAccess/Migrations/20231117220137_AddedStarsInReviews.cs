using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LaboratorioModulo3_DotNet.DataAccess.Migrations
{
	/// <inheritdoc />
	public partial class AddedStarsInReviews : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<int>(
				name: "Stars",
				table: "Reviews",
				type: "int",
				nullable: false,
				defaultValue: 0);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "Stars",
				table: "Reviews");
		}
	}
}
