
using FluentValidation;

using MediatR;

using Microsoft.Extensions.Logging;

using Modilist.Business.Exceptions;
using Modilist.Data.Repositories.AddressDomain;
using Modilist.Data.Repositories.SalesOrderDomain;
using Modilist.Domains.Models.SalesOrderDomain;

namespace Modilist.Business.CQRS.SalesOrderDomain.Commands
{
    public class CreateMonthlySalesOrder : IRequest
    {
        public CreateMonthlySalesOrder(Guid accountId)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }
    }

    internal class CreateMonthlySalesOrderValidator : AbstractValidator<CreateMonthlySalesOrder>
    {
        public CreateMonthlySalesOrderValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateMonthlySalesOrderHandler : IRequestHandler<CreateMonthlySalesOrder>
    {
        private readonly ISalesOrderRepository _salesOrderRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ILogger<CreateMonthlySalesOrderHandler> _logger;

        public CreateMonthlySalesOrderHandler(ISalesOrderRepository salesOrderRepository, ILogger<CreateMonthlySalesOrderHandler> logger, IAddressRepository addressRepository)
        {
            _salesOrderRepository = salesOrderRepository;
            _logger = logger;
            _addressRepository = addressRepository;
        }

        public async Task<Unit> Handle(CreateMonthlySalesOrder request, CancellationToken cancellationToken)
        {
            var latestActiveOrder = await _salesOrderRepository.GetLatestActiveOrderAsync(request.AccountId, cancellationToken);

            if (latestActiveOrder != null)
            {
                using (_logger.BeginScope("Missing Order for Account: {AccountId}", request.AccountId))
                {
                    if (DateTime.UtcNow.AddDays(-7) >= latestActiveOrder.CreatedAt)
                    {
                        _logger.LogCritical("Potential latency for SalesOrder: {SalesOrderId}", latestActiveOrder.Id);
                    }
                    else
                    {
                        _logger.LogWarning("Account already has an active SalesOrder: {SalesOrderId}", latestActiveOrder.Id);
                    }
                }

                return Unit.Value;
            }

            var defaultAddress = await _addressRepository.GetDefaultByAccountIdAsync(request.AccountId, cancellationToken);

            if (defaultAddress == null)
            {
                throw new DefaultAddressNotFoundException(request.AccountId);
            }

            var salesOrder = new SalesOrder(request.AccountId);

            salesOrder.AssignAddress(defaultAddress);

            await _salesOrderRepository.AddAsync(salesOrder, cancellationToken);

            return Unit.Value;
        }
    }
}
