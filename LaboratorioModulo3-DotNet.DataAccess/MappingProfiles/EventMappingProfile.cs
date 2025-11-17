using AutoMapper;

using LaboratorioModulo3_DotNet.Domain.Entities.Events;

using DalEntities = LaboratorioModulo3_DotNet.DataAccess.Entities;

namespace LaboratorioModulo3_DotNet.DataAccess.MappingProfiles;

public class EventMappingProfile : Profile
{

    public EventMappingProfile()
    {
        CreateMap<DalEntities.Event, Event>()
            .ConstructUsing(e => new Event(e.Id, e.Name, e.StartDate, e.EndDate, e.Participants));
        CreateMap<Event, DalEntities.Event>();
    }
}
