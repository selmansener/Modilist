using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class PaymentMethodAlreadyExistsException : Exception, IClientException
    {
        public PaymentMethodAlreadyExistsException(Guid accountId, string cardName)
            : base($"Payment method already exists with CardName: {cardName} AdditionalInfo: Account Id: {accountId}")
        {
            AccountId = accountId;
            CardName = cardName;
        }

        public Guid AccountId { get; private set; }

        public string CardName { get; private set; }

        public int StatusCode => 409;
    }
}
