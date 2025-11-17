using LaboratorioModulo3_DotNet.Domain.Entities;

using LaboratorioModulo3_DotNet.Domain.Entities.Exceptions;

namespace LaboratorioModulo3_DotNet.Domain.Entities.Events;

public class Event : Entity
{

    public int Id { get; private set; }

    public string FirstName { get; private set; }

    public string LastName { get; private set; }

    public Event(int id, string firstName, string lastName)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }

    public void UPdateFirstName(string firstName)
    {
        FirstName = firstName;
        EnsureStateIsValid();
    }

    public void UpdateLastName(string lastName)
    {
        LastName = lastName;
        EnsureStateIsValid();
    }

    protected override void EnsureStateIsValid()
    {
        if (string.IsNullOrWhiteSpace(FirstName) || FirstName.Length > 100)
        {
            AddValidationError("First name should contains between 1 and 100 characters, and cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(LastName) || LastName.Length > 100)
        {
            AddValidationError("Last name should contains between 1 and 100 characters, and cannot be empty.");
        }

        Validate();
    }
}