using LaboratorioModulo3_DotNet.Application.Exceptions;

using Microsoft.AspNetCore.Mvc;

using System.Net;

namespace LaboratorioModulo3_DotNet.Api.Extensions;

public static class ControllerExtensions
{
	private static readonly Dictionary<Type, HttpStatusCode> ExceptionToHttpCodeMap = new()
	{
		[typeof(EntityNotFoundException)] = HttpStatusCode.NotFound
	};

	public static ObjectResult Problem(this ControllerBase controller, Exception exception)
	{
		HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
		var exceptionType = exception.GetType();
		if (ExceptionToHttpCodeMap.ContainsKey(exceptionType))
		{
			statusCode = ExceptionToHttpCodeMap[exceptionType];
		}

		return controller.Problem(title: statusCode.ToString(), detail: exception.Message, statusCode: (int)statusCode);
	}
}
