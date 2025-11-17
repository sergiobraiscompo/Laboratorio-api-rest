using LaboratorioModulo3_DotNet.DataAccess.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LaboratorioModulo3_DotNet.DataAccess.EntityTypeConfigurations
{
    public class EventEntityTypeConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name)
                .HasMaxLength(50)
                .IsRequired(true);
            builder.Property<DateTime>(e => e.StartDate)
                .IsRequired();

            builder.Property<DateTime>(e => e.EndDate)
                .IsRequired();

            builder.Property(e => e.Description)
            .HasMaxLength(500)
            .IsRequired(true);
        }
    }
}
