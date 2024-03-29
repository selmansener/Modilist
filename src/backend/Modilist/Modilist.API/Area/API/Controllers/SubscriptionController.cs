﻿using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.SubscriptionDomain.Commands;
using Modilist.Business.CQRS.SubscriptionDomain.DTOs;
using Modilist.Business.CQRS.SubscriptionDomain.Queries;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class SubscriptionController : APIBaseController
    {
        private readonly IMediator _mediator;

        public SubscriptionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.Subscriptions))]
        [HttpGet("[controller].Get")]
        [ProducesResponseType(typeof(SubscriptionDTO), 200)]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var subscription = await _mediator.Send(new GetSubscription
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(subscription);
        }


        [Authorize(nameof(AuthorizationPermissions.Subscriptions))]
        [HttpPost("[controller].Create")]
        [ProducesResponseType(typeof(SubscriptionDTO), 200)]
        public async Task<IActionResult> Create(CancellationToken cancellationToken)
        {
            var subscription = await _mediator.Send(new CreateSubscription
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(subscription);
        }


        [Authorize(nameof(AuthorizationPermissions.Subscriptions))]
        [HttpPost("[controller].Update")]
        [ProducesResponseType(typeof(SubscriptionDTO), 200)]
        public async Task<IActionResult> Update(UpdateSubscription input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();
         
            var subscription = await _mediator.Send(input, cancellationToken);

            return Ok(subscription);
        }


        [Authorize(nameof(AuthorizationPermissions.Subscriptions))]
        [HttpPost("[controller].Suspend")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Suspend(SuspendSubscription input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            await _mediator.Send(input, cancellationToken);

            return Ok();
        }


        [Authorize(nameof(AuthorizationPermissions.Subscriptions))]
        [HttpPost("[controller].Activate")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Activate(CancellationToken cancellationToken)
        {
            await _mediator.Send(new ActivateSubscription
            {
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok();
        }
    }
}
