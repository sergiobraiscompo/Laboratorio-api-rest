namespace LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories
{
	public interface IUnitOfWork
	{
		Task CommitAsync();

		void RollbackAsync();
	}
}
