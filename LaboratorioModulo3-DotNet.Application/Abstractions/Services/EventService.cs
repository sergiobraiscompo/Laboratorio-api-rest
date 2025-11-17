using FluentValidation;
using FluentValidation.Results;

using LaboratorioModulo3_DotNet.Application.Abstractions.Services;
using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Events;
using LaboratorioModulo3_DotNet.Application.Dtos.Queries.Events;
using LaboratorioModulo3_DotNet.Application.Extensions.Mappers;
using LaboratorioModulo3_DotNet.DataAccess.Repositories;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;
using LaboratorioModulo3_DotNet.Domain.Entities.Events;

namespace LaboratorioModulo3_DotNet.Services;

public class EventService : EventService
{
    private readonly IValidator<ParticipantsDto> _eventDtoValidator;
    private IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOFWork;


    public EventService(IValidator<ParticipantsDto> eventDtoValidator, IEventRepository eventRepository, IUnitOfWork unitOfWork)
    {
        _eventDtoValidator = eventDtoValidator;
        _eventRepository = eventRepository;
        _unitOFWork = unitOfWork;
    }

    public async Task<(ValidationResult ValidationResult, int? EventId)> AddEvent(EventsDto event)
    {
        var validationResult = _eventDtoValidator.Validate(event);
        if (validationResult.IsValid)
        {
            var repoResult = await _eventRepository.AddEvent(event.ConvertToDomainEntity());
            await _unitOFWork.CommitAsync();

            return (validationResult, repoResult.Id);
        }
return (validationResult, null);
    }

    public async Task<ValidationResult> EditEvent(EventsDto event)
{
    var validationResult = _eventDtoValidator.Validate(event);
    if (validationResult.IsValid)
    {
        Event eventEntity = null;

        try
        {
            eventEntity = await _eventRepository.GetEvent(event.Id);
        }
        catch (Domain.Exceptions.EntityNotFoundException ex)
        {
            throw new Application.Exceptions.EntityNotFoundException($"Unable to find an event with id {event.Id}.", ex);
        }

        eventEntity.UPdateFirstName(event.FirstName);
        eventEntity.UpdateLastName(event.LastName);

        await _eventRepository.EditEvent(eventEntity);
        await _unitOFWork.CommitAsync();
    }

    return validationResult;
}

public async Task DeleteEvent(int eventId)
{
    await _eventRepository.DeleteEvent(eventId);
    await _unitOFWork.CommitAsync();
}