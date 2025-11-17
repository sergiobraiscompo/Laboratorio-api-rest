using FluentValidation;
using FluentValidation.Results;

using LaboratorioModulo3_DotNet.Application.Abstractions.Services;
using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Participants;
using LaboratorioModulo3_DotNet.Application.Extensions.Mappers;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;

using AppExceptions = LaboratorioModulo3_DotNet.Application.Exceptions;
using DomExceptions = LaboratorioModulo3_DotNet.Domain.Exceptions;

namespace LaboratorioModulo3_DotNet.Application.Services;

public class ParticipantService : Abstractions.Services.ParticipantService
{

	private readonly IParticipantRepository _participantRepository;

	private readonly IUnitOfWork _unitOfWork;

	private readonly IValidator<ParticipantDto> _participantDtoValidator;

	public ParticipantService(IParticipantRepository participantRepository, IUnitOfWork unitOfWork, IValidator<ParticipantDto> ParticipantDtoValidator)
	{
		_participantRepository = participantRepository;
		_unitOfWork = unitOfWork;
		_participantDtoValidator = ParticipantDtoValidator;
	}

	public async Task<(ValidationResult ValidationResult, int? participant)> AddParticipant(ParticipantDto participant)
	{
		ArgumentNullException.ThrowIfNull(participant, nameof(participant));

		participant.Operation = ParticipantDto.OperationType.Add;
		var validationResult = _participantDtoValidator.Validate(participant);

		if (!validationResult.IsValid)
		{
			return (validationResult, null);
		}

		await _unitOfWork.CommitAsync();
		return (validationResult);
	}

	public async Task<ValidationResult> EditParticipant(ParticipantDto participant)
	{
		ArgumentNullException.ThrowIfNull(participant, nameof(participant));

		participant.Operation = ParticipantDto.OperationType.Edit;

		var validationResult = await _participantDtoValidator.ValidateAsync(participant);
		if (validationResult.IsValid)
		{
			var ParticipantEntity = await _participantRepository.GetParticipant(participant.Id);

			if (ParticipantEntity is null)
			{
				throw new AppExceptions.EntityNotFoundException($"Unable to find a participant with ID {participant.Id}.");
			}

			ParticipantEntity.UpdateName(participant.Name);
			ParticipantEntity.UpdateLastName(participant.LastName);
			ParticipantEntity.UpdateEmail(participant.Email);
            ParticipantEntity.UpdateEvents(participant.Events);

			await _participantRepository.EditParticipant(ParticipantEntity);
			await _unitOfWork.CommitAsync();
		}

		return validationResult;
	}

	public async Task DeleteParticipant(int ParticipantId)
	{
		try
		{
			await _ParticipantRepository.DeleteParticipant(ParticipantId);
			await _unitOfWork.CommitAsync();
		}
		catch (DomExceptions.EntityNotFoundException ex)
		{
			throw new AppExceptions.EntityNotFoundException(ex.Message, ex);
		}
	}