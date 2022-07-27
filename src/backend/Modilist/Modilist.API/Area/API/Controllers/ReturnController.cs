using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.ReturnDomain.Commands;
using Modilist.Business.CQRS.ReturnDomain.DTOs;
using Modilist.Business.CQRS.ReturnDomain.Queries;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class ReturnController : APIBaseController
    {
        private readonly IMediator _mediator;

        public ReturnController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("Get/{salesOrderId}")]
        [Authorize(nameof(AuthorizationPermissions.Returns))]
        [ProducesResponseType(typeof(ReturnDTO), 200)]
        public async Task<IActionResult> Get(int salesOrderId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetReturn
            {
                AccountId = User.GetUserId(),
                SalesOrderId = salesOrderId
            }, cancellationToken);

            return Ok(response);
        }

        [HttpPost("Create")]
        [Authorize(nameof(AuthorizationPermissions.Returns))]
        [ProducesResponseType(typeof(ReturnDTO), 200)]
        public async Task<IActionResult> Create(CreateReturn input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
