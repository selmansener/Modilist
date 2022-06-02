using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.StylePreferencesDomain.Commands;
using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Business.CQRS.StylePreferencesDomain.Queries;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class SizeInfoController : APIBaseController
    {
        private readonly IMediator _mediator;

        public SizeInfoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.GetSizeInfo))]
        [HttpGet("Get")]
        [ProducesResponseType(typeof(SizeInfoDTO), 200)]
        public async Task<IActionResult> Get()
        {
            var response = await _mediator.Send(new GetSizeInfo { AccountId = User.GetUserId() });

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.UpsertSizeInfo))]
        [HttpPost("Upsert")]
        [ProducesResponseType(typeof(SizeInfoDTO), 200)]
        public async Task<IActionResult> Upsert(UpsertSizeInfo input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
