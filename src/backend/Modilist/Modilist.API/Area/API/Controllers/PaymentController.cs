using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.PaymentDomain.Commands;
using Modilist.Business.CQRS.PaymentDomain.DTOs;
using Modilist.Business.CQRS.PaymentDomain.Queries;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class PaymentController : APIBaseController
    {
        private readonly IMediator _mediator;

        public PaymentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpGet("[controller].GetAll")]
        [ProducesResponseType(typeof(IEnumerable<PaymentMethodDTO>), 200)]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetAllPaymentMethods
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpGet("[controller].GetDefaultPaymentMethod")]
        [ProducesResponseType(typeof(PaymentMethodDTO), 200)]
        public async Task<IActionResult> GetDefaultPaymentMethod(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetDefaultPaymentMethod
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpPost("[controller].CreatePaymentMethod")]
        [ProducesResponseType(typeof(PaymentMethodDTO), 200)]
        public async Task<IActionResult> CreatePaymentMethod(CreatePaymentMethod input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpPost("[controller].Create/{salesOrderId}")]
        [ProducesResponseType(typeof(PaymentDTO), 200)]
        public async Task<IActionResult> CreatePayment(int salesOrderId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new CreatePayment
            {
                AccountId = User.GetUserId(),
                SalesOrderId = salesOrderId,
            }, cancellationToken);

            return Ok(response);
        }
    }
}
