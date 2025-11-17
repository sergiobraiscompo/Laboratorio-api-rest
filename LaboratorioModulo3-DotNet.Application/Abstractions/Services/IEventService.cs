using FluentValidation.Results;

using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Events;

namespace LaboratorioModulo3_DotNet.Application.Abstractions.Services
{
	public interface IEventService
	{
		Task<(ValidationResult ValidationResult, int? EventId)> AddEvent(EventDto event);

		Task<ValidationResult> EditEvent(EventDto event);

		Task DeleteEvent(int eventId);
	}
}