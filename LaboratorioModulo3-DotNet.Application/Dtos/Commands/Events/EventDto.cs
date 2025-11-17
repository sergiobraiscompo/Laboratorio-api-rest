using System.ComponentModel.DataAnnotations;

namespace LaboratorioModulo3_DotNet.Application.Dtos.Commands.Events;

public class EventsDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "The name is required.")]
    [StringLength(100, ErrorMessage = "The name must contains 100 characters maximum.")]
    public required string FirstName { get; set; }

    [Required(ErrorMessage = "The last name is required.")]
    [StringLength(100, ErrorMessage = "The last name must contains 100 characters maximum.")]
    public required string LastName { get; set; }
}