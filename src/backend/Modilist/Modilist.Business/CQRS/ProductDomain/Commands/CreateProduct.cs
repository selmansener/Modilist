﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.ProductDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.ProductDomain;
using Modilist.Domains.Models.ProductDomain;

namespace Modilist.Business.CQRS.ProductDomain.Commands
{
    public class CreateProduct : IRequest<ProductDTO>
    {
        public string SKU { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Brand { get; set; }
    }

    internal class CreateProductValidator : AbstractValidator<CreateProduct>
    {
        public CreateProductValidator()
        {
            RuleFor(c => c.SKU).NotEmpty();
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.Category).NotEmpty();
        }
    }

    internal class CreateProductHandler : IRequestHandler<CreateProduct, ProductDTO>
    {
        private readonly IProductRepository _productRepository;

        public CreateProductHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDTO> Handle(CreateProduct request, CancellationToken cancellationToken)
        {
            Product? product = await _productRepository.GetBySKUAsync(request.SKU, cancellationToken);

            if (product != null)
            {
                throw new ProductAlreadyExistsException(request.SKU);
            }

            product = new Product(request.SKU, request.Name, request.Category, request.Brand);

            await _productRepository.AddAsync(product, cancellationToken);

            return product.Adapt<ProductDTO>();
        }
    }
}
