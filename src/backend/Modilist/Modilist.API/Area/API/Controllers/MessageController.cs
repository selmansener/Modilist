using Microsoft.AspNetCore.Mvc;

using Modilist.Business.Utils.DTOs;
using Modilist.Business.Utils.Messages;

namespace Modilist.API.Area.API.Controllers
{
    public class MessageController : APIBaseController
    {
        private IMailProvider _mailProvider;

        public MessageController(IMailProvider mailProvider)
        {
            _mailProvider = mailProvider;
        }

        [HttpPost("[controller].SendEmail")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Create(SendMail input, CancellationToken cancellationToken)
        {
            await _mailProvider.SendMail(input, cancellationToken);

            return Ok();
        }
    }
}
