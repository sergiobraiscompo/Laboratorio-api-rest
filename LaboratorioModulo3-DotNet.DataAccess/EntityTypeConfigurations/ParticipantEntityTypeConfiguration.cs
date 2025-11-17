using LaboratorioModulo3_DotNet.DataAccess.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LaboratorioModulo3_DotNet.DataAccess.EntityTypeConfigurations;

public class ParticipantEntityTypeConfiguration : IEntityTypeConfiguration<Participant>
{
	public void Configure(EntityTypeBuilder<Participant> builder)
	{
		builder.HasKey(p => p.Id);
		builder.Property(p => p.LastName)
			.HasMaxLength(500)
			.IsRequired(true);
		builder.Property(p => p.Email)
			.HasMaxLength(10000)
			.IsRequired(true);
		builder.HasMany(p => p.Events)
			.WithMany(p => p.Events);
	}
}
