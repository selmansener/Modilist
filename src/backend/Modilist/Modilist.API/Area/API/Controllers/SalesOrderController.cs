﻿using DynamicQueryBuilder;
using DynamicQueryBuilder.Models;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.SalesOrderDomain.Commands;
using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.CQRS.SalesOrderDomain.Queries;
using Modilist.Business.DTOs;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class SalesOrderController : APIBaseController
    {
        private readonly IMediator _mediator;

        public SalesOrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("[controller].Query")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(DQBResultDTO<SalesOrderDetailsDTO>), 200)]
        [DynamicQuery]
        public async Task<IActionResult> QuerySalesOrders([FromQuery] DynamicQueryOptions dqb, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new QuerySalesOrders
            {
                AccountId = User.GetUserId(),
                Dqb = dqb
            }, cancellationToken);

            return Ok(response);
        }

        [HttpGet("[controller].{salesOrderId}")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(SalesOrderDetailsDTO), 200)]
        public async Task<IActionResult> Get(int salesOrderId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetSalesOrderDetails
            {
                AccountId = User.GetUserId(),
                SalesOrderId = salesOrderId
            }, cancellationToken);

            return Ok(response);
        }

        [HttpGet("[controller].Active")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(ActiveSalesOrderDTO), 200)]
        public async Task<IActionResult> GetActiveOrder(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetActiveSalesOrder
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        [HttpGet("[controller].Latest")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(LatestSalesOrderDTO), 200)]
        public async Task<IActionResult> GetLatestOrder(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetLatestSalesOrder
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].CreateNewSalesOrder")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(SalesOrderDTO), 200)]
        public async Task<IActionResult> CreateNewSalesOrder(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new CreateNewSalesOrder
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].CreateFirstOrder")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(SalesOrderDTO), 200)]
        public async Task<IActionResult> CreateFirstOrder(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new CreateFirstSalesOrder
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(response);
        }

        // TODO: This endpoint should be explicit for Style Advisors only. Change permission after RBAC implementation.
        [HttpPost("[controller].Create")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(SalesOrderDTO), 200)]
        public async Task<IActionResult> Create(CreateSalesOrder input, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        // TODO: This endpoint should be explicit for Style Advisors only. Change permission after RBAC implementation.
        [HttpPost("[controller].{salesOrderId}/AddLineItem")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(AddSalesOrderLineItemDTO), 200)]
        public async Task<IActionResult> AddLineItem(int salesOrderId, AddSalesOrderLineItem input, CancellationToken cancellationToken)
        {
            input.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        // TODO: This endpoint shouldn't exists. A scheduled job will change sales order status.
        [HttpPost("[controller].{salesOrderId}/Ship")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(ShipSalesOrderDTO), 200)]
        public async Task<IActionResult> Ship(int salesOrderId, ShipSalesOrder input, CancellationToken cancellationToken)
        {
            input.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/Feedback/{salesOrderLineItemId}")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(AddOrUpdateFeedbackDTO), 200)]
        public async Task<IActionResult> Feedback(int salesOrderId, int salesOrderLineItemId, AddOrUpdateFeedback input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();
            input.SalesOrderId = salesOrderId;
            input.SalesOrderLineItemId = salesOrderLineItemId;

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/BuyAll")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(typeof(AddOrUpdateFeedbackDTO), 200)]
        public async Task<IActionResult> BuyAll(int salesOrderId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new BuyAllLineItems
            {
                AccountId = User.GetUserId(),
                SalesOrderId = salesOrderId,
            }, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/UpdateAddress")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateAddress(int salesOrderId, [FromBody] UpdateSalesOrderAddress request, CancellationToken cancellationToken)
        {
            request.AccountId = User.GetUserId();
            request.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(request, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/UpdateEstimatedDeliveryDate")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateEstimatedDeliveryDate(int salesOrderId, [FromBody] UpdateEstimatedDeliveryDate request, CancellationToken cancellationToken)
        {
            request.AccountId = User.GetUserId();
            request.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(request, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/UpdateAdditionalRequests")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateAdditionalRequests(int salesOrderId, [FromBody] UpdateAdditionalRequests request, CancellationToken cancellationToken)
        {
            request.AccountId = User.GetUserId();
            request.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(request, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/UpdateRequestedStyle")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateRequestedStyle(int salesOrderId, [FromBody] UpdateRequestedStyle request, CancellationToken cancellationToken)
        {
            request.AccountId = User.GetUserId();
            request.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(request, cancellationToken);

            return Ok(response);
        }

        [HttpPost("[controller].{salesOrderId}/UpdateMaxPricingLimit")]
        [Authorize(nameof(AuthorizationPermissions.SalesOrders))]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UpdateMaxPricingLimit(int salesOrderId, [FromBody] UpdateMaxPricingLimit request, CancellationToken cancellationToken)
        {
            request.AccountId = User.GetUserId();
            request.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(request, cancellationToken);

            return Ok(response);
        }
    }
}
