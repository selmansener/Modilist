using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.UserDomain.Commands;
using Modilist.Business.CQRS.UserDomain.DTOs;
using Modilist.Business.CQRS.UserDomain.Queries;
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
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Get()
        {
            var account = await _mediator.Send(new GetAccount { Id = User.GetUserId() });

            return Ok(account);
        }

        [Authorize(nameof(AuthorizationPermissions.CreateAccount))]
        [HttpPost("Create")]
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Create(CreateAccount input, CancellationToken cancellationToken)
        {
            await _mediator.Send(input, cancellationToken);

            return Ok();
        }

        [Authorize(nameof(AuthorizationPermissions.UpdateAccount))]
        [HttpPost("Update")]
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Update(UpdateAccount input, CancellationToken cancellationToken)
        {
            input.Id = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
