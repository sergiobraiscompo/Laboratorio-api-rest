using Dapper;

using LaboratorioModulo3_DotNet.Application.Abstractions.Queries;
using LaboratorioModulo3_DotNet.Application.Config;
using LaboratorioModulo3_DotNet.Application.Dtos.Queries.Events;
using LaboratorioModulo3_DotNet.Application.Exceptions;
using LaboratorioModulo3_DotNet.Application.Queries.Pagination;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace LaboratorioModulo3_DotNet.Application.Queries;

public class EventQueriesService : QueryServiceBase, IEventQueriesService
{

	public EventQueriesService(IOptionsSnapshot<DapperConfig> dapperConfig) : base(dapperConfig)
	{
	}

	public async Task<PaginatedResults<EventWithParticipantCountDto>> GetEvents(int pageNumber = 1, int resultsPerPage = 10)
	{
		PaginationHelper.CheckPaginationValidity(pageNumber, resultsPerPage);
		var totalEvents = await SqlConnection.QuerySingleOrDefaultAsync<int>("SELECT COUNT(1) FROM AUTHORS");

		var result = await PaginationHelper.PaginateAsync(totalEvents, pageNumber, resultsPerPage, async (offset, fetch) =>
		{
			return await SqlConnection.QueryAsync<EventWithParticipantCountDto>(
			@"SELECT
				e.Id,
				e.Name,
				e.StartDate,
				e.EndDate,
				e.Descritpion,
				e.Participants
				COUNT(ep.ParticipantsId) as ParticipantCount
				FROM
				Events e
				LEFT JOIN 
				EventParticipant ep ON e.Id = ep.EventsId
				GROUP BY 
				a.Id, a.Name
				ORDER BY a.Name
				OFFSET @offset ROWS
				FETCH NEXT @fetch ROWS ONLY",
				new { offset = offset, fetch = fetch });
		});

		return result;
	}

	public async Task<EventWithParticipantCountDto> GetEventById(int eventId)
	{
		var event = await SqlConnection.QuerySingleOrDefaultAsync<EventWithParticipantCountDto>(
			@"SELECT
				e.Id,
				e.Name,
				e.StartDate,
				e.EndDate,
				e.Descritpion,
				e.Participants
				FROM
					Events e
				LEFT JOIN 
					EventParticipant ep ON e.Id = ep.EventsId
				WHERE e.Id=@eventId
				GROUP BY 
					e.Id, e.Name", new { eventId = eventId }
		);

	if (event is null)
	{
		throw new EntityNotFoundException($"Unable to find the event with ID {eventId}.");
	}

	return event;
}
}