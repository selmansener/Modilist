using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.API.Models;
using Modilist.Business.CQRS.UserDomain.Commands;
using Modilist.Business.CQRS.UserDomain.Commands.DTOs;

namespace Modilist.API.Area.API.Controllers
{
    public class UserController : APIBaseController
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // TODO: change response type with a generic object
        [Authorize(nameof(AuthorizationPermissions.CreateAccount))]
        [HttpPost("Create")]
        [ProducesResponseType(typeof(CommonResponse), 200)]
        public async Task<IActionResult> Post(CreateAccount input, CancellationToken cancellationToken)
        {
            await _mediator.Send(input, cancellationToken);

            return Ok(new CommonResponse(200));
        }

        // TODO: change response type with a generic object
        [Authorize(nameof(AuthorizationPermissions.UpdateAccount))]
        [HttpPost("Update")]
        [ProducesResponseType(typeof(CommonResponse<UpdateAccountOutputDTO>), 200)]
        public async Task<IActionResult> Post(UpdateAccount input, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(input, cancellationToken);

            return Ok(new CommonResponse<UpdateAccountOutputDTO>(200, response));
        }
    }
}
