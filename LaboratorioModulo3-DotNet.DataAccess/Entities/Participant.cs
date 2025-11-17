namespace LaboratorioModulo3_DotNet.DataAccess.Entities;

public class Participant
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public ICollection<Event> Events{ get; set; }
}