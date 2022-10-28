using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class PaymentMethodNotFoundException : Exception, IClientException
    {

        public PaymentMethodNotFoundException(Guid accountId, string cardName)
            : base($"Payment method not found with Name: {cardName}. AdditionalInfo: AccountId: {accountId}")
        {
            AccountId = accountId;
            CardName = cardName;
        }

        public Guid AccountId { get; private set; }

        public string? CardName { get; private set; }

        public int StatusCode => 404;
    }
}
