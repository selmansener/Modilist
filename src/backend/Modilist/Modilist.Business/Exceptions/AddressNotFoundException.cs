
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

        public AddressNotFoundException(Guid accountId, string name)
            : base($"Address not found with Name: {name}. AdditionalInfo: AccountId: {accountId}")
        {
            AccountId = accountId;
            Name = name;
        }

        public Guid AccountId { get; private set; }

        public int? AddressId { get; private set; }

        public string? Name { get; private set; }

        public int StatusCode => 404;
    }
}
