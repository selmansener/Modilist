using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.DiscountsDomain.Commands;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class DiscountController : APIBaseController
    {
        private readonly IMediator _mediator;

        public DiscountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.Discounts))]
        [HttpPost("[controller].Send")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Send(SendInvitation input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            await _mediator.Send(input, cancellationToken);

            return Ok();
        }

    }
}
