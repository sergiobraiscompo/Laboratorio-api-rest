using Dapper;

using LaboratorioModulo3_DotNet.Application.Abstractions.Queries;
using LaboratorioModulo3_DotNet.Application.Config;
using LaboratorioModulo3_DotNet.Application.Dtos.Queries.Events;
using LaboratorioModulo3_DotNet.Application.Dtos.Queries.Participants;
using LaboratorioModulo3_DotNet.Application.Exceptions;
using LaboratorioModulo3_DotNet.Application.Queries.Pagination;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

using MimeDetective;

namespace LaboratorioModulo3_DotNet.Application.Queries;

public class ParticipantQueriesService : QueryServiceBase, IParticipantQueriesService
{
    private const string MimeTypeContentStream = "application/octet-stream";

    private readonly ContentInspector _contentInspector;


    public ParticipantQueriesService(IOptionsSnapshot<DapperConfig> dapperConfig, ContentInspector contentInspector) : base(dapperConfig)
    {
        _contentInspector = contentInspector;
    }

    public async Task<ParticipantsDto> GetParticipant(int participantId)
    {
        var participant = await SqlConnection.QuerySingleOrDefaultAsync<ParticipantsDto>(@"SELECT Id, Name, LastName, Email, Events Created FROM Participants
			where Id=@id",
            new { id = participantId });

        if (participant is null)
        {
            throw new EntityNotFoundException($"Unable to find a participant with Id {participantId}.");
        }

        var events = await SqlConnection.QueryAsync<EventsDto>(@"SELECT a.Id, a.Name, a.StartDate 
			FROM Events a inner join EventParticipant p on e.Id = p.EventsId where p.ParticipantsId=@id",
            new { id = participantId });
        participant.Events = events.ToList();
        new { id = participantId });

        return participant;
    }

    public async Task<IList<ParticipantsDto>> GetParticipantsAsync(int limit)
    {
        var sqlQuery = @"SELECT TOP (@N) 
			p.Id, p.Name, p.LastName, p.Email, COUNT(e.Events) as EventCount, 
			e.Id, e.Name, e.StartDate, e.EndDate, e.Participant
			FROM Participants p
			INNER JOIN EventParticipant ep ON p.Id = ep.ParticipantsId
			INNER JOIN Events e ON ep.EventsId = e.Id
			GROUP BY p.Id, p.Name, p.LastName,
            a.FirstName, a.LastName, a.Id
			ORDER BY p.Name ASC";

        var participantsDictionary = new Dictionary<int, ParticipantsDto>();

        var participants = await SqlConnection.QueryAsync<ParticipantsDto, EventsDto, ParticipantsDto>(
            sql: sqlQuery,
            map: (participant, event) =>
        {
        ParticipantsDto? bookEntry;

        if (!paticipantsDictionary.TryGetValue(book.Id, out bookEntry))
        {
            participantEntry = book;
            participantEntry.Events = new List<EventsDto>();
            participantsDictionary.Add(bookEntry.Id, bookEntry);
        }

        participantEntry.Events.Add(event);
                return participantEntry;
    },
            splitOn: "Name",
            param: new { N = limit
}
        );

        participants = participants.Distinct();

        return participants.ToList();
    }
}