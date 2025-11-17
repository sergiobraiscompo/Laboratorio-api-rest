using LaboratorioModulo3_DotNet.Application.Config;
using LaboratorioModulo3_DotNet.Application.Config.Validators;
using LaboratorioModulo3_DotNet.DataAccess.Repositories;
using LaboratorioModulo3_DotNet.Domain.Abstractions.Repositories;

using MimeDetective;
using Dapper;

using appQueryServiceAbstractions = LaboratorioModulo3_DotNet.Application.Abstractions.Queries;
using AppQueryServices = LaboratorioModulo3_DotNet.Application.Queries;
using appServiceAbstractions = LaboratorioModulo3_DotNet.Application.Abstractions.Services;
using AppServices = LaboratorioModulo3_DotNet.Application.Services;

namespace LaboratorioModulo3_DotNet.Api.Extensions;

public static class ServiceCollectionExtensions
{

	public static IServiceCollection AddMappings(this IServiceCollection serviceCollection)
	{
		serviceCollection.AddAutoMapper(
			typeof(LaboratorioModulo3_DotNet.DataAccess.MappingProfiles.EventMappingProfile).Assembly);

		return serviceCollection;
	}


	public static IServiceCollection AddInfraServices(this IServiceCollection serviceCollection)
	{
		serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();
		serviceCollection.AddScoped<IEventRepository, EventRepository>();
		serviceCollection.AddScoped<IParticipantRepository, ParticipantRepository>();

		return serviceCollection;
	}

	public static IServiceCollection AddUtilities(this IServiceCollection serviceCollection)
	{
		serviceCollection.AddSingleton<ContentInspector>((serviceProvider) =>
			new ContentInspectorBuilder()
			{
				Definitions = MimeDetective.Definitions.Default.All()
			}.Build()
		);

		return serviceCollection;
	}

	public static IServiceCollection AddConfigurations(this IServiceCollection serviceCollection, IConfiguration configuration)
	{
		serviceCollection.Configure<DapperConfig>(configuration.GetSection(DapperConfig.ConfigurationSection));
		return serviceCollection;
	}


	public static IServiceCollection AddAppServices(this IServiceCollection serviceCollection)
	{
		serviceCollection.AddScoped<appServiceAbstractions.ParticipantService, AppServices.ParticipantService>();
		serviceCollection.AddScoped<appServiceAbstractions.IEventService, AppServices.EventService>();
		serviceCollection.AddScoped<appQueryServiceAbstractions.IEventQueriesService, AppQueryServices.IEventQueriesService>();
		serviceCollection.AddScoped<appQueryServiceAbstractions.IParticipantQueriesService, AppQueryServices.IParticipantQueriesService>();

		return serviceCollection;
	}

}
