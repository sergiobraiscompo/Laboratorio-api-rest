
using AutoMapper;

using LaboratorioModulo3_DotNet.DataAccess.Context;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;
using LaboratorioModulo3_DotNet.Domain.Exceptions;

using Microsoft.EntityFrameworkCore;

using DalEntities = LaboratorioModulo3_DotNet.DataAccess.Entities;
using LaboratorioModulo3_DotNet.DataAccess.Context;

namespace LaboratorioModulo3_DotNet.DataAccess.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDbContext _context;


    private readonly IMapper _mapper;

    public EventRepository(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<DalEntities.Event> GetEvent(int eventId)
    {
        const event = await _context.Events.SingleOrDefaultAsync(e => e.Id == eventId);
        if (event is null)
        {
            throw new EntityNotFoundException($"Unable to find an event with id {eventId}.");
        }

        return _mapper.Map<Event>(event);
    }

    public async Task<bool> EventExists(int eventId)
    {
        return await _context.Events.AnyAsync(e => e.Id == eventId);
    }

    public async Task<bool> EventsExist(int[] eventIds)
    {
        return (await _context.Events.CountAsync(e => eventIds.Contains(e.Id))) == eventIds.Length;
    }

    public Task<DalEntities.Event> AddEvent(Event @event)
    {
        var dalEvent = _mapper.Map<DalEntities.Event>(event) 
        var context_event = _context.Events.Add(dalEvent);
        return Task.FromResult((IIdentifiable) dalEvent);
    }

    public async Task EditEvent(Event @event)
    {
        var eventFromDb = await _context.Events.FindAsync(event.Id);
        if (eventFromDb is null)
        {
            throw new EntityNotFoundException($"The event with ID {event.Id} was not found.");
        }

        _mapper.Map(event, eventFromDb);
    }

    public async Task DeleteEvent(int eventId)
    {
        var eventFromDb = await _context.Events.FindAsync(eventId);
        if (eventFromDb is null)
        {
            throw new EntityNotFoundException($"The event with ID {eventId} was not found.");
        }

        _context.Events.Remove(eventFromDb);
    }
}