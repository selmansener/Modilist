namespace Modilist.API.Models
{

    public class CommonResponse
    {
        public CommonResponse(int statusCode, string? message = null, string? type = null)
        {
            StatusCode = statusCode;
            Message = message;
            Type = type;
        }

        public int StatusCode { get; protected set; }

        public string? Message { get; protected set; }

        public string? Type { get; protected set; }
    }

    public class CommonResponse<TData> : CommonResponse
    {
        public CommonResponse(int statusCode, TData data, string? message = null, string? type = null)
            : base(statusCode, message, type)
        {
            Data = data;
        }

        public TData? Data { get; protected set; }
    }
}
