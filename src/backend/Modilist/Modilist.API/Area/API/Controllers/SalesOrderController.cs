using DynamicQueryBuilder;
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

        [HttpGet("Query")]
        [Authorize(nameof(AuthorizationPermissions.GetSalesOrders))]
        [ProducesResponseType(typeof(DQBResultDTO<SalesOrderDTO>), 200)]
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

        // TODO: This endpoint should be explicit for Style Advisors only. Change permission after RBAC implementation.
        [HttpPost("Create")]
        [Authorize(nameof(AuthorizationPermissions.CreateSalesOrders))]
        [ProducesResponseType(typeof(SalesOrderDTO), 200)]
        public async Task<IActionResult> Create(CreateSalesOrder input, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        // TODO: This endpoint should be explicit for Style Advisors only. Change permission after RBAC implementation.
        [HttpPost("{salesOrderId}/AddLineItem")]
        [Authorize(nameof(AuthorizationPermissions.UpdateSalesOrders))]
        [ProducesResponseType(typeof(AddSalesOrderLineItemDTO), 200)]
        public async Task<IActionResult> AddLineItem(int salesOrderId, AddSalesOrderLineItem input, CancellationToken cancellationToken)
        {
            input.SalesOrderId = salesOrderId;

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
