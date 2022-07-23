
using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class AddressNotFoundException : Exception, IClientException
    {
        public AddressNotFoundException(Guid accountId, int addressId)
            : base($"Address not found with Id: {addressId}. AdditionalInfo: AccountId: {accountId}")
        {
            AccountId = accountId;
            AddressId = addressId;
        }

        public Guid AccountId { get; set; }

        public int AddressId { get; set; }

        public int StatusCode => 404;
    }
}
