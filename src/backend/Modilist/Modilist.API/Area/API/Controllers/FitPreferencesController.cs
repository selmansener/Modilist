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
    public class FitPreferencesController : APIBaseController
    {
        private readonly IMediator _mediator;

        public FitPreferencesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.StylePreferences))]
        [HttpGet("[controller].Get")]
        [ProducesResponseType(typeof(FitPreferencesDTO), 200)]
        public async Task<IActionResult> Get()
        {
            var response = await _mediator.Send(new GetFitPreferences { AccountId = User.GetUserId() });

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.StylePreferences))]
        [HttpPost("[controller].Upsert")]
        [ProducesResponseType(typeof(FitPreferencesDTO), 200)]
        public async Task<IActionResult> Upsert(UpsertFitPreferences input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
