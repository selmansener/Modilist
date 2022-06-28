using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Modilist.API.Configurations;
using Modilist.Business.CQRS.ProductDomain.Commands;
using Modilist.Business.CQRS.ProductDomain.DTOs;

namespace Modilist.API.Area.API.Controllers
{
    public class ProductController : APIBaseController
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Create")]
        [Authorize(nameof(AuthorizationPermissions.CreateProducts))]
        [ProducesResponseType(typeof(ProductDTO), 200)]
        public async Task<IActionResult> Create(CreateProduct input, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(input, cancellationToken);

            return Ok(response);
        }

        [HttpPost("AddImages/{productId}")]
        [Authorize(nameof(AuthorizationPermissions.UpdateProducts))]
        [ProducesResponseType(typeof(AddProductImagesDTO), 200)]
        public async Task<IActionResult> AddImages(int productId, [FromForm] IEnumerable<IFormFile> files, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new AddProductImages
            {
                ProductId = productId,
                Files = files
            }, cancellationToken);

            return Ok(response);
        }
    }
}
