using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Microsoft.AspNetCore.Razor.TagHelpers;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Data.Repositories.SubscriptionDomain;
using Modilist.Domains.Models.AddressDomain;
using Modilist.Domains.Models.SalesOrderDomain;
using Modilist.Domains.Models.SubscriptionDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreateNewSalesOrder : IRequest<SalesOrderDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

    }

    internal class CreateNewSalesOrderValidator : AbstractValidator<CreateNewSalesOrder>
    {
        public CreateNewSalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateNewSalesOrderHandler : IRequestHandler<CreateNewSalesOrder, SalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public CreateNewSalesOrderHandler(ISalesOrderRepository salesOrderRepository, IAddressRepository addressRepository, ISubscriptionRepository subscriptionRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _addressRepository = addressRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<SalesOrderDTO> Handle(CreateNewSalesOrder request, CancellationToken cancellationToken)
        {
            SalesOrder? latestSalesOrder = await _salesOrderRepository.GetLatestActiveOrderAsync(request.AccountId, cancellationToken);

            if(latestSalesOrder != null)
            {
                throw new ActiveSalesOrderAlreadyExistsException(request.AccountId, latestSalesOrder.Id, latestSalesOrder.State);
            }

            Address? address = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if(address == null)
            {
                throw new DefaultAddressNotFoundException(request.AccountId);
            }

            Subscription? subscription = await _subscriptionRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (subscription == null)
            {
                throw new SubscriptionNotFoundException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId, subscription.MaxPricingLimit);

            salesOrder.AssignAddress(address);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return salesOrder.Adapt<SalesOrderDTO>();
        }
    }
}
