using LaboratorioModulo3_DotNet.Application.Dtos.Queries.Particpants;
using LaboratorioModulo3_DotNet.Application.Queries.Pagination;

namespace LaboratorioModulo3_DotNet.Application.Abstractions.Queries;

public interface IParticipantQueriesService
{

	Task<ParticipantsDto> GetParticipant(int participantId);

	Task<IList<ParticipantsDto>> GetNoveltiesAsync(int limit);
}
