using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

using Modilist.Business.CQRS.ProductDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.ProductDomain;
using Modilist.Domains.Models.ProductDomain;
using Modilist.Infrastructure.Azure.Extensions.BlobStorage;
using Modilist.Infrastructure.Shared.Configurations;

namespace Modilist.Business.CQRS.ProductDomain.Commands
{
    public  class AddProductImages : IRequest<AddProductImagesDTO>
    {
        public int ProductId { get; set; }

        public IEnumerable<IFormFile> Files { get; set; }
    }

    internal class AddProductImagesValidator : AbstractValidator<AddProductImages>
    {
        public AddProductImagesValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
            RuleFor(x => x.Files).NotEmpty();
        }
    }

    internal class AddProductImagesHandler : IRequestHandler<AddProductImages, AddProductImagesDTO>
    {
        private readonly IProductRepository _productRepository;
        private readonly IBlobClientFactory _blobClientFactory;
        private readonly BlobServiceClient _blobServiceClient;

        public AddProductImagesHandler(IProductRepository productRepository, IBlobClientFactory blobClientFactory, IOptions<StorageConnectionStrings> options)
        {
            _productRepository = productRepository;
            _blobClientFactory = blobClientFactory;
            _blobServiceClient = _blobClientFactory.GetClient(options.Value.AppStorage);
        }

        public async Task<AddProductImagesDTO> Handle(AddProductImages request, CancellationToken cancellationToken)
        {
            Product? product = await _productRepository.GetByIdAsync(request.ProductId, cancellationToken);

            if (product == null)
            {
                throw new ProductNotFoundException(request.ProductId);
            }

            BlobContainerClient container = _blobServiceClient.GetBlobContainerClient("products");
            await container.CreateIfNotExistsAsync(publicAccessType: Azure.Storage.Blobs.Models.PublicAccessType.Blob);

            foreach (var file in request.Files)
            {
                var extension = file.FileName.Split('.').Last();

                var fileName = Guid.NewGuid().ToString();
                var fullFileName = $"{fileName}.{extension}";

                var path = $"{product.Category}/{product.SKU}/{fullFileName}";

                BlobClient blobClient = container.GetBlobClient(path);

                await blobClient.UploadAsync(file.OpenReadStream(), cancellationToken);

                product.AddImage(fullFileName, file.ContentType, blobClient.Uri.AbsoluteUri, extension);   
            }

            await _productRepository.UpdateAsync(product, cancellationToken);

            return product.Adapt<AddProductImagesDTO>();
        }
    }
}
