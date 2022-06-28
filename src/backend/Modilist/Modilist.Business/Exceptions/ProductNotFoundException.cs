
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ProductNotFoundException : Exception, IClientException
    {
        public ProductNotFoundException(int id)
            : base($"Product not found with ID: {id}")
        {
            Id = id;
        }

        public int Id { get; set; }

        public int StatusCode => 404;
    }
}
