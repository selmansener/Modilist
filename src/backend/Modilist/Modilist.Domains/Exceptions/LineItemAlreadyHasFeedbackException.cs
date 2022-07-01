
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Domains.Exceptions
{
    internal class LineItemAlreadyHasFeedbackException : Exception, IClientException
    {
        public LineItemAlreadyHasFeedbackException(int lineItemFeedbackId)
            : base($"SalesOrderLineItem already has a LineItemFeedback with Id: {lineItemFeedbackId}")
        {
            LineItemFeedbackId = lineItemFeedbackId;
        }

        public int LineItemFeedbackId { get; private set; }

        public int StatusCode => 400;
    }
}
