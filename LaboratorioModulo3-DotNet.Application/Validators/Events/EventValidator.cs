using FluentValidation;
using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Events;

namespace LaboratorioModulo3_DotNet.Application.Validators.Events;

public class EventValidator : AbstractValidator<ParticipantsDto>
{
    public EventValidator()
    {
        RuleFor(p => p.FirstName)
            .NotNull()
            .NotEmpty()
            .Length(1, 100)
            .WithMessage("The event first name should contains between 1 and 100 characters.");

        RuleFor(p => p.LastName)
            .NotNull()
            .NotEmpty()
            .Length(1, 100)
            .WithMessage("The event first name should contains between 1 and 100 characters.");
    }
}