using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.API.Models;
using Modilist.Business.CQRS.UserDomain.Commands;
using Modilist.Business.CQRS.UserDomain.Commands.DTOs;
using Modilist.Business.CQRS.UserDomain.Queries;
using Modilist.Business.CQRS.UserDomain.Queries.DTOs;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class UserController : APIBaseController
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [Authorize(nameof(AuthorizationPermissions.GetAccount))]
        [HttpGet("Get")]
        [ProducesResponseType(typeof(CommonResponse<GetAccountOutputDTO>), 200)]
        public async Task<IActionResult> Get()
        {
            var account = await _mediator.Send(new GetAccount { Id = User.GetUserId() });

            return Ok(new CommonResponse<GetAccountOutputDTO>(200, account));
        }

        [Authorize(nameof(AuthorizationPermissions.CreateAccount))]
        [HttpPost("Create")]
        [ProducesResponseType(typeof(CommonResponse), 200)]
        public async Task<IActionResult> Post(CreateAccount input, CancellationToken cancellationToken)
        {
            await _mediator.Send(input, cancellationToken);

            return Ok(new CommonResponse(200));
        }

        [Authorize(nameof(AuthorizationPermissions.UpdateAccount))]
        [HttpPost("Update")]
        [ProducesResponseType(typeof(CommonResponse<UpdateAccountOutputDTO>), 200)]
        public async Task<IActionResult> Post(UpdateAccount input, CancellationToken cancellationToken)
        {
            input.Id = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(new CommonResponse<UpdateAccountOutputDTO>(200, response));
        }
    }
}
