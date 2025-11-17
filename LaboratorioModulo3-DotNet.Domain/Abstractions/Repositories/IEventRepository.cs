using LaboratorioModulo3_DotNet.Domain.Abstractions.Entities;
using LaboratorioModulo3_DotNet.Domain.Entities.Events;
using LaboratorioModulo3_DotNet.Domain.Entities;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;

public interface IEventRepository
{
    Task<Event> GetEvent(int eventId);

    Task<bool> EventExists(int eventId);

    Task<bool> EventsExist(int[] eventIds);

    Task<IIdentifiable> AddEvent(Event @event);

    Task EditEvent(Event @event);

    Task DeleteEvent(int eventId);
}