using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Events;
using LaboratorioModulo3_DotNet.Domain.Entities.Events;

namespace LaboratorioModulo3_DotNet.Application.Extensions.Mappers;

internal static class EventMapperExtensions
{

	public static EventDto ConverToDto(this Event event)
	{
		return new EventDto
        {
			Name = event.Name,
			Id = event.Id,
			Description = event.Description,
			StartDate = event.StartDate,
			EndDate = event.EndDate,
			Participants = event.Participants
		}
	}

	public static Event ConvertToDomainEntity(this EventDto eventDto)
	{
		return new Event(
			name = eventDto.Name,
			id = eventDto.Id,
			description = eventDto.Description,
			startDate = eventDto.StartDate,
			endDate = eventDto.EndDate,
			participants = eventDto.Participants
		);
	}
}
