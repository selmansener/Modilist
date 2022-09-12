namespace Modilist.Infrastructure.Shared.Events
{
    public class InvitationSent : BaseEvent
    {
        public InvitationSent(string publisherId, PublisherType publisherType, string senderName, string receiverEmail)
            : base(publisherId, publisherType)
        {
            SenderName = senderName;
            ReceiverEmail = receiverEmail;
        }

        public string SenderName { get; set; }

        public string ReceiverEmail { get; set; }

        public override string Version => "1.0";
    }
}
