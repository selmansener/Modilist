
using Azure;
using Azure.Messaging.EventGrid;

using Modilist.Infrastructure.Azure.Extensions.Configurations;

namespace Modilist.Infrastructure.Azure.Extensions.EventGrid
{
    public interface IEventGridPublisherClientFactory
    {
        EventGridPublisherClient GetClient(EventGridClientOptions options);
    }

    internal class EventGridPublisherClientFactory : IEventGridPublisherClientFactory
    {
        public EventGridPublisherClient GetClient(EventGridClientOptions options)
        {
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            if (string.IsNullOrEmpty(options.Url))
            {
                throw new ArgumentNullException(nameof(options.Url));
            }

            if (string.IsNullOrEmpty(options.Secret))
            {
                throw new ArgumentNullException(nameof(options.Secret));
            }

            return new EventGridPublisherClient(
                new Uri(options.Url),
                new AzureKeyCredential(options.Secret));
        }
    }
}
