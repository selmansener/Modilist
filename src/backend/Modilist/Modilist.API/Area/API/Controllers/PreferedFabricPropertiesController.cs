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
    public class PreferedFabricPropertiesController : APIBaseController
    {
        private readonly IMediator _mediator;

        public PreferedFabricPropertiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.StylePreferences))]
        [HttpGet("[controller].Get")]
        [ProducesResponseType(typeof(PreferedFabricPropertiesDTO), 200)]
        public async Task<IActionResult> Get()
        {
            var response = await _mediator.Send(new GetPreferedFabricProperties { AccountId = User.GetUserId() });

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.StylePreferences))]
        [HttpPost("[controller].Upsert")]
        [ProducesResponseType(typeof(PreferedFabricPropertiesDTO), 200)]
        public async Task<IActionResult> Upsert(UpsertPreferedFabricProperties input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
