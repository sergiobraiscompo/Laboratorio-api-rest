using LaboratorioModulo3_DotNet.Domain.Abstractions.Entities;
using LaboratorioModulo3_DotNet.Domain.Entities.Participants;

namespace LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;

public interface IParticipantRepository
{

	Task<Participant> GetParticipant(int participantId);

	Task<bool> ParticipantExists(int participantId);

	Task<bool> ParticipantsExist(int[] participantIds);

	Task<IIdentifiable> AddParticipant(Participant participant);

	Task EditParticipant(Participant participant);

	Task DeleteParticipant(int participantId);
}
