using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LaboratorioModulo3_DotNet.DataAccess.Migrations
{
	/// <inheritdoc />
	public partial class AddedAVerageInBooks : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.AddColumn<double>(
				name: "AVerage",
				table: "Books",
				type: "float(2)",
				precision: 2,
				nullable: false,
				defaultValue: 0.0);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropColumn(
				name: "AVerage",
				table: "Books");
		}
	}
}
