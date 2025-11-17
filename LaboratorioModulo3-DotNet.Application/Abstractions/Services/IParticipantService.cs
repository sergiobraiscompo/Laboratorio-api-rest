using FluentValidation.Results;

using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Participants;

namespace LaboratorioModulo3_DotNet.Application.Abstractions.Services;

public interface IParticipantService
{
	Task<(ValidationResult ValidationResult, int? participant)> AddParticipant(ParticipantDto participant);

	Task<ValidationResult> EditParticipant(ParticipantDto participant);

	Task DeleteParticipant(int participantId);
}