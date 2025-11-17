using AutoMapper;

using LaboratorioModulo3_DotNet.DataAccess.Context;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Entities;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;
using LaboratorioModulo3_DotNet.Domain.Entities.Participants;
using LaboratorioModulo3_DotNet.Domain.Exceptions;

using Microsoft.EntityFrameworkCore;

using DalEntities = LaboratorioModulo3_DotNet.DataAccess.Entities;

namespace LaboratorioModulo3_DotNet.DataAccess.Repositories;

public class ParticipantRepository: IParticipantRepository
{
	private readonly ApplicationDbContext _context;

	private readonly IMapper _mapper;

	public ParticipantRepository(ApplicationDbContext context, IMapper mapper)
	{
		_context = context;
		_mapper = mapper;
	}

	public async Task<Participant> GetParticipant(int participantId) =>
		_mapper.Map<Participant>(await _context.Participants
			.Include(p => p.Events)
			.SingleOrDefaultAsync(p => p.Id == participantId));

	public async Task<bool> ParticipantExists(int participantId)
	{
		return await _context.Participants.AnyAsync(p => p.Id == participantId);
	}

	public async Task<IIdentifiable> AddParticipant(Participant participant)
	{
		ArgumentNullException.ThrowIfNull(participant, nameof(participant));
		var dalParticipant = _mapper.Map<DalEntities.Participant>(participant);

		var events = await _context.Participants.Where(e => participant.Events.Contains(e.Id)).ToListAsync();

		if (events.Count != participant.Events.Count())
		{
			throw new EntityNotFoundException($"One or more events don't exist in the database.");
		}

		dalParticipant.Events = events;
		_context.Participants.Add(dalParticipant);
		return dalParticipant;
	}

	public async Task EditParticipant(Participant participant)
	{
		var existingParticipant = await _context.Participants.Include(p => p.Events)
			.SingleAsync(p => p.Id == participant.Id);

		if (existingParticipant is null)
		{
			throw new EntityNotFoundException($"The paticipant with identifier {participant.Id} does not exist in the database.");
		}

		var events = await _context.Events.Where(e => participant.Events.Contains(e.Id)).ToListAsync();
		if (events.Count != participant.Events.Count())
		{
			throw new EntityNotFoundException($"One or more events don't exist in the database.");
		}

		_mapper.Map(participant, existingParticipant);
		existingParticipant.Events.Clear();
		foreach (var event in events)
		{
			existingParticipant.Events.Add(event);
		}
	}

	public async Task DeleteParticipant(int particpantId)
	{
		var participant = await _context.Participants.FindAsync(particpantId);
		if (participant is null)
		{
			throw new EntityNotFoundException($"Unable to find a participant with ID {particpantId}.");
		}

		_context.Participants.Remove(participant);
	}

    Task<Domain.Entities.Participants.Participant> IParticipantRepository.GetParticipant(int participantId)
    {
        throw new NotImplementedException();
    }

    Task<bool> IParticipantRepository.ParticipantExists(int participantId)
    {
        throw new NotImplementedException();
    }

    Task<bool> IParticipantRepository.ParticipantsExist(int[] participantIds)
    {
        throw new NotImplementedException();
    }

    Task<IIdentifiable> IParticipantRepository.AddParticipant(Domain.Entities.Participants.Participant participant)
    {
        throw new NotImplementedException();
    }

    Task IParticipantRepository.EditParticipant(Domain.Entities.Participants.Participant participant)
    {
        throw new NotImplementedException();
    }

    Task IParticipantRepository.DeleteParticipant(int participantId)
    {
        throw new NotImplementedException();
    }
}
