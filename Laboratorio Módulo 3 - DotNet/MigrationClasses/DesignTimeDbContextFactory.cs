using LaboratorioModulo3_DotNet.DataAccess.Context;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace LaboratorioModulo3_DotNet.Api;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
	public ApplicationDbContext CreateDbContext(string[] args)
	{
		var configuration = new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile("appsettings.json")
			.AddUserSecrets(typeof(Program).Assembly)
			.Build();
		var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
		var connectionString = configuration.GetConnectionString("DefaultConnectionString");
		builder.UseSqlServer(connectionString);
		return new ApplicationDbContext(builder.Options);
	}
}