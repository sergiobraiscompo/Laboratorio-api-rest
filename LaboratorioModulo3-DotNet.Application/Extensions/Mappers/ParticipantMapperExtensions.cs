using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Participants;
using LaboratorioModulo3_DotNet.Domain.Entities.Participants;

namespace LaboratorioModulo3_DotNet.Application.Extensions.Mappers;

internal static class ParticipantMapperExtensions
{

    public static Participant ConvertToDomainEntity(this ParticipantDto participant)
    {
        return new Participant(
            Id: participant.Id,
            name: participant.Name,
            lastName: participant.LastName,
            email: participant.Email,
            events: participant.Events
            );
    }
}