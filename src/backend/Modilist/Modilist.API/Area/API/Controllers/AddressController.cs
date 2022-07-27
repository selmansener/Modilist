﻿using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.AddressDomain.Commands;
using Modilist.Business.CQRS.AddressDomain.DTOs;
using Modilist.Business.CQRS.AddressDomain.Queries;
using Modilist.Business.Utils.AddressDomain;
using Modilist.Business.Utils.AddressDomain.Models;
using Modilist.Infrastructure.Shared.Extensions;

namespace Modilist.API.Area.API.Controllers
{
    public class AddressController : APIBaseController
    {
        private readonly IMediator _mediator;
        private readonly IAddressService _addressService;

        public AddressController(IMediator mediator, IAddressService addressService)
        {
            _mediator = mediator;
            _addressService = addressService;
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("GetCities")]
        [ProducesResponseType(typeof(IEnumerable<City>), 200)]
        public IActionResult GetCities()
        {
            return Ok(_addressService.GetCities());
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("GetDistricts/{cityCode}")]
        [ProducesResponseType(typeof(IEnumerable<District>), 200)]
        public IActionResult GetDistricts(string cityCode)
        {
            return Ok(_addressService.GetDistricts(cityCode));
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("GetAll")]
        [ProducesResponseType(typeof(IEnumerable<AddressDTO>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var response = await _mediator.Send(new GetAllAddresses
            {
                AccountId = User.GetUserId()
            });

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("GetDefault")]
        [ProducesResponseType(typeof(AddressDTO), 200)]
        public async Task<IActionResult> GetDefault()
        {
            var defaultAddress = await _mediator.Send(new GetDefaultAddress
            {
                AccountId = User.GetUserId()
            });

            return Ok(defaultAddress);
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("Get/{id}")]
        [ProducesResponseType(typeof(AddressDTO), 200)]
        public async Task<IActionResult> Get(int id, CancellationToken cancellationToken)
        {
            var address = await _mediator.Send(new GetAddress
            {
                Id = id,
                AccountId = User.GetUserId()
            }, cancellationToken);

            return Ok(address);
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("Create")]
        [ProducesResponseType(typeof(AddressDTO), 200)]
        public async Task<IActionResult> Create(CreateAddress input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("Update/{name}")]
        [ProducesResponseType(typeof(AddressDTO), 200)]
        public async Task<IActionResult> Update(string name, UpdateAddress input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();
            input.Name = name;

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("Upsert/{name}")]
        [ProducesResponseType(typeof(AddressDTO), 200)]
        public async Task<IActionResult> Upsert(string name, UpsertAddress input, CancellationToken cancellationToken)
        {
            input.AccountId = User.GetUserId();
            input.Name = name;

            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }
    }
}
