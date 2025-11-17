using LaboratorioModulo3_DotNet.DataAccess.Context;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;

namespace LaboratorioModulo3_DotNet.DataAccess.Repositories;

public class UnitOfWork : IUnitOfWork
{
	private readonly ApplicationDbContext _context;

	public UnitOfWork(ApplicationDbContext context)
	{
		_context = context;
	}

	public Task CommitAsync() =>
		_context.SaveChangesAsync();

	public void RollbackAsync()
	{
	}
}
