
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ProductAlreadyExistsException : Exception, IClientException
    {
        public ProductAlreadyExistsException(string sku)
            : base($"Product already exists with SKU: {sku}")
        {
            SKU = sku;
        }

        public string SKU { get; private set; }

        public int StatusCode => 409;
    }
}
