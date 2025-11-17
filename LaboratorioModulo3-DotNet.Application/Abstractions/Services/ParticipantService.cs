using FluentValidation;
using FluentValidation.Results;

using LaboratorioModulo3_DotNet.Application.Abstractions.Services;
using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Participants;
using LaboratorioModulo3_DotNet.Application.Extensions.Mappers;
using LaboratorioModulo3_DotNet.Application.Services;
using LaboratorioModulo3_DotNet.DataAccess.Repositories;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;
using LaboratorioModulo3_DotNet.Domain.Entities.Participants;
using static System.Net.Mime.MediaTypeNames;

namespace LaboratorioModulo3_DotNet.Services;

public class ParticipantService : IParticipantService
{
    private readonly IValidator<ParticipantsDto> _participantDtoValidator;
    private IParticipantRepository _participantRepository;
    private readonly IUnitOfWork _unitOFWork;


    public ParticipantService(IValidator<ParticipantsDto> participantDtoValidator, IParticipantRepository participantRepository, IUnitOfWork unitOfWork)
    {
        _participantDtoValidator = participantDtoValidator;
        _participantRepository = participantRepository;
        _unitOFWork = unitOfWork;
    }

    public async Task<(ValidationResult ValidationResult, int? ParticipantId)> AddParticipant(ParticipantsDto participant)
    {
        var validationResult = _participantDtoValidator.Validate(participant);
        if (validationResult.IsValid)
        {
            var repoResult = await _participantRepository.AddParticipant(participant.ConvertToDomainEntity());
            await _unitOFWork.CommitAsync();

            return (validationResult, repoResult.Id);
        }
        return (validationResult, null);
    }

    public async Task<ValidationResult> EditParticipant(ParticipantsDto participant)
    {
        var validationResult = _participantDtoValidator.Validate(participant);
        if (validationResult.IsValid)
        {
            Participant participantEntity = null;

            try
            {
                participantEntity = await _participantRepository.GetParticipant(participant.Id);
            }
            catch (Domain.Exceptions.EntityNotFoundException ex)
            {
                throw new Application.Exceptions.EntityNotFoundException($"Unable to find an participant with id {participant.Id}.", ex);
            }

            participantEntity.UPdateFirstName(participant.FirstName);
            participantEntity.UpdateLastName(participant.LastName);

            await _participantRepository.EditParticipant(participantEntity);
            await _unitOFWork.CommitAsync();
        }

        return validationResult;
    }

    public async Task DeleteParticipant(int participantId)
    {
        await _participantRepository.DeleteParticipant(participantId);
        await _unitOFWork.CommitAsync();
    }
}