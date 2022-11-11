using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class AddressAlreadyExistsException : Exception, IClientException
    {
        public AddressAlreadyExistsException(Guid accountId, int addressId, string name)
            : base($"Address already exists with Name: {name} and AccountId: {accountId}. AdditionalInfo: AddressId: {addressId}")
        {
            AccountId = accountId;
            AddressId = addressId;
            Name = name;
        }

        public Guid AccountId { get; private set; }

        public int AddressId { get; private set; }

        public string Name { get; private set; }

        public int StatusCode => 409;
    }
}
