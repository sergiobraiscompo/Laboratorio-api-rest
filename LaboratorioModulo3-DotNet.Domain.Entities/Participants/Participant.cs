using LaboratorioModulo3_DotNet.Domain.Entities.Events;

namespace LaboratorioModulo3_DotNet.Domain.Entities.Participants;

public class Participant : Entity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required ICollection<Event> Events { get; set; }

    public void UpdateName(string name)
    {
        this.Name = name;
        EnsureStateIsValid();
    }
    public void UpdateLastName(string lastName)
    {
        this.LastName = lastName;
        EnsureStateIsValid();
    }
    public void UpdateEmail(string email)
    {
        this.Email = email;
        EnsureStateIsValid();
    }

    public void UpdateEvents(ICollection<Event> events)
    {
        this.Events = events;
        EnsureStateIsValid();
    }

    public Participant(int id, string name, string lastName, string email, ICollection<Event> events)
    {
        this.Id = id;
        this.Name = name;
        this.LastName = lastName;
        this.Email = email;
        this.Events = events;
        EnsureStateIsValid();
    }

    protected override void EnsureStateIsValid()
    {
        if (string.IsNullOrWhiteSpace(Name))
        {
            AddValidationError("The name is mandatory.");
        }

        if (string.IsNullOrWhiteSpace(LastName))
        {
            AddValidationError("The last name is mandatory.");
        }

        if (string.IsNullOrWhiteSpace(Email))
        {
            AddValidationError("The email is mandatory.");
        }

        Validate();
    }
}
