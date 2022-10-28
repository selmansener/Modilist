using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Modilist.Infrastructure.Shared.Interfaces;

namespace Modilist.Business.Exceptions
{
    internal class ConversationIdFailureException : Exception
    {
        public ConversationIdFailureException(Guid accountId, string expectedConversationId, string currentConversationId) 
            : base($"Iyzico ConversationId check failed, ExpectedValue: {expectedConversationId}, CurrentValue: {currentConversationId}")
        {
            AccountId = accountId;
            ExpectedConversationId = expectedConversationId;
            CurrentConversationId = currentConversationId;
        }

        public Guid AccountId { get; private set; }

        public string ExpectedConversationId { get; set; }

        public string CurrentConversationId { get; set; }
    }
}
