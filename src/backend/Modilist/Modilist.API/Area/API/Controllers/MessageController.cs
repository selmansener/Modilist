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
        public async Task<IActionResult> SendEmail(SendMail input, CancellationToken cancellationToken)
        {
            await _mailProvider.SendMailAsync(input, cancellationToken);

            return Ok();
        }

        [HttpPost("[controller].SendEmailWithAttachments")]
        [ProducesResponseType(200)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> SendEmailWithAttachments([FromForm] SendMailWithAttachments input, CancellationToken cancellationToken)
        {
            await _mailProvider.SendMailWithAttachmentsAsync(input, cancellationToken);

            return Ok();
        }
    }
}
