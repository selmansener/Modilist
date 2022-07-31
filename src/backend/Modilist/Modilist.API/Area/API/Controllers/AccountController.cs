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
    public class AccountController : APIBaseController
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpGet("[controller].Get")]
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var account = await _mediator.Send(new GetAccount { Id = User.GetUserId() }, cancellationToken);

            return Ok(account);
        }

        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpPost("[controller].Create")]
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Create(CreateAccount input, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpPost("[controller].Update")]
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Update(UpdateAccount input, CancellationToken cancellationToken)
        {
            input.Id = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpPost("[controller].Activate")]
        [ProducesResponseType(typeof(AccountDTO), 200)]
        public async Task<IActionResult> Activate(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new ActivateAccount
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }
    }
}
