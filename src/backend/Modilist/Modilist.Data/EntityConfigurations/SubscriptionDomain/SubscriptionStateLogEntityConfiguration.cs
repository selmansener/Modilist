
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Modilist.Domains.Models.SubscriptionDomain;
using Modilist.Infrastructure.Shared.Enums;

namespace Modilist.Data.EntityConfigurations.SubscriptionDomain
{
    internal class SubscriptionStateLogEntityConfiguration : IEntityTypeConfiguration<SubscriptionStateLog>
    {
        public void Configure(EntityTypeBuilder<SubscriptionStateLog> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo(nameof(SubscriptionStateLog));

            builder.HasOne(x => x.Subscription)
                .WithMany(x => x.StateLogs)
                .HasForeignKey(x => x.SubscriptionId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.SuspentionReasons).HasConversion<string>(
                reasons => reasons.Count == 0 ? null : string.Join(",", reasons.Select(reason => reason.ToString())),
                reasons => string.IsNullOrEmpty(reasons) ? new List<SubscriptionSuspentionReason>() : reasons.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(reason => Enum.Parse<SubscriptionSuspentionReason>(reason)).ToList())
                .IsRequired(false);
        }
    }
}
