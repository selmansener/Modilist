using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.PaymentDomain.Commands;
using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class PaymentMethodController : APIBaseController
    {
        private readonly IMediator _mediator;

        public PaymentMethodController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.CreatePaymentMethod))]
        [HttpPost("Create")]
        [ProducesResponseType(typeof(PaymentMethodDTO), 200)]
        public async Task<IActionResult> Create(CreatePaymentMethod input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
