namespace Modilist.Business.Utils.Exceptions
{
    internal class SendMailFailureException : Exception
    {
        public SendMailFailureException(int statusCode, string reason)
        {
            StatusCode = statusCode;
            Reason = reason;
        }

        public int StatusCode { get; private set; }

        public string Reason { get; private set; }
    }
}
