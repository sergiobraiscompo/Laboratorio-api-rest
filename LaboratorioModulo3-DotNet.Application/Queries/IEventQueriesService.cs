
using Dapper;
using LaboratorioModulo3_DotNet.Application.Config;
using LaboratorioModulo3_DotNet.Application.Queries;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

using LaboratorioModulo3_DotNet.Application.Abstractions.Queries;
using LaboratorioModulo3_DotNet.Application.Dtos.Queries.Events;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace LaboratorioModulo3_DotNet.Application.Queries
{
    public class IEventQueriesService : IEventQueriesService, IDisposable
{

    private readonly SqlConnection _connection;
    private bool disposedValue;

    public IEventQueriesService(IOptionsSnapshot<DapperConfig> dapperConfig)
    {
        _connection = new SqlConnection(dapperConfig.Value.DefaultConnectionString);
        _connection.Open();
    }

    public async Task<List<EventWithParticipantCountDto>> GetEvents()
    {
        return (await _connection.QueryAsync<EventWithParticipantCountDto>(
            @"SELECT
				    a.Id,
				a.FirstName,
				a.LastName,
				COUNT(ab.ParticipantsId) as ParticipantCount
				FROM
				Events a
				LEFT JOIN 
				EventParticipant ab ON a.Id = ab.EventsId
				GROUP BY 
				a.Id, a.FirstName, a.LastName")).ToList();
    }

    public async Task<EventWithParticipantCountDto> GetEventById(int eventId)
    {
        var event = await _connection.QuerySingleOrDefaultAsync<EventWithParticipantCountDto>(
                @"SELECT
				    a.Id,
				a.FirstName,
				a.LastName,
				COUNT(ab.ParticipantsId) as ParticipantCount
				FROM
				Events a
				LEFT JOIN 
				EventParticipant ab ON a.Id = ab.EventsId
				WHERE a.Id=@eventId
				GROUP BY 
				a.Id, a.FirstName, a.LastName", new { eventId = eventId
});

if (event is null)
            {
    throw new EntityNotFoundException($"Unable to find the event with ID {eventId}.");
}

            return event;
}

protected virtual void Dispose(bool disposing)
{
    if (!disposedValue)
    {
        if (disposing)
        {
            _connection.Close();
            _connection.Dispose();
        }

        disposedValue = true;
    }
}

public void Dispose()
{
    // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
    Dispose(disposing: true);
    GC.SuppressFinalize(this);
}
    }
}