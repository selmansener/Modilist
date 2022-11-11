using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.SalesOrderDomain.DTOs;
using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class UpdateMaxPricingLimit : IRequest<SalesOrderDTO>
    {
        private int _maxPricingLimit = 0;

        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int SalesOrderId { get; set; }

        public string MaxPricingLimit { get; set; }

        public int MaxPricingLimitAsInt
        {
            get
            {
                if (!int.TryParse(MaxPricingLimit, out _maxPricingLimit))
                {

                    _maxPricingLimit = 5250;
                }
                return _maxPricingLimit;
            }
        }
    }

    internal class UpdateMaxPricingLimitValidator : AbstractValidator<UpdateMaxPricingLimit>
    {
        public UpdateMaxPricingLimitValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.MaxPricingLimitAsInt).NotEmpty()
                .GreaterThanOrEqualTo(1500)
                .Must(x => x % 250 == 0);
        }
    }

    internal class UpdateMaxPricingLimitHandler : IRequestHandler<UpdateMaxPricingLimit, SalesOrderDTO>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;

        public UpdateMaxPricingLimitHandler(ISalesOrderRepository salesOrderRepository)
        {
            _salesOrderRepository = salesOrderRepository;
        }

        public async Task<SalesOrderDTO> Handle(UpdateMaxPricingLimit request, CancellationToken cancellationToken)
        {
            SalesOrder? salesOrder = await _salesOrderRepository.GetSalesOrderAsync(request.AccountId, request.SalesOrderId, cancellationToken);
            
            if(salesOrder == null)
            {
                throw new SalesOrderNotFoundException(request.AccountId, request.SalesOrderId);
            }

            salesOrder.SetMaxPricingLimit(request.MaxPricingLimit);

            return salesOrder.Adapt<SalesOrderDTO>();
        }
    }
}
