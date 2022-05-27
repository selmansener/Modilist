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
    public class StylePreferencesController : APIBaseController
    {
        private readonly IMediator _mediator;

        public StylePreferencesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.GetStylePreferences))]
        [HttpGet("Get")]
        [ProducesResponseType(typeof(StylePreferencesDTO), 200)]
        public async Task<IActionResult> Get()
        {
            var response = await _mediator.Send(new GetStylePreferences { AccountId = User.GetUserId() });

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.CreateStylePreferences))]
        [HttpPost("Create")]
        [ProducesResponseType(typeof(StylePreferencesDTO), 200)]
        public async Task<IActionResult> Create(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new CreateStylePreferences
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.UpdateStylePreferences))]
        [HttpPost("Update")]
        [ProducesResponseType(typeof(StylePreferencesDTO), 200)]
        public async Task<IActionResult> Update(UpdateStylePreferences input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
