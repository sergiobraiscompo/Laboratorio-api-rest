using FluentValidation;

using LaboratorioModulo3_DotNet.Application.Dtos.Commands.Participants;

namespace LaboratorioModulo3_DotNet.Application.Validators.Participants;

public class ParticipantValidatorDto : AbstractValidator<ParticipantDto>
{

    public ParticipantValidatorDto()
    {
        RuleFor(p => p.Name).NotNull().NotEmpty()
            .Length(1, 100)
            .WithMessage("The participant's name should contain between 1 and 100 characters.");

        RuleFor(p => p.LastName).NotNull().NotEmpty()
            .Length(1, 100)
            .WithMessage("The particpant's last name should contain between 10 and 100 characters.");

        RuleFor(p => p.Email).NotNull().NotEmpty()
            .Length(10, 100)
            .WithMessage("The participant's email should contain between 10 and 1000 characters.");
    }
}
