using System;
using System.Threading;
using System.Threading.Tasks;

using MediatR;

using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

using Modilist.Business.CQRS.SalesOrderDomain.Commands;
using Modilist.Business.CQRS.UserDomain.Queries;
using Modilist.Data.Repositories.UserDomain;

namespace Modilist.Functions.ScheduledJobs.Jobs.SalesOrdersDomain
{
    public class CreateSalesOrdersJob
    {
        private readonly IMediator _mediator;

        public CreateSalesOrdersJob(IMediator mediator)
        {
            _mediator = mediator;
        }

        [FunctionName(nameof(CreateSalesOrdersJob))]
        public async Task CreateSalesOrdersAsync([TimerTrigger("%CreateSalesOrdersCron%")] TimerInfo timer, ILogger logger, CancellationToken cancellationToken)
        {
            try
            {
                var accounts = await _mediator.Send(new GetAllActiveAccounts(), cancellationToken);

                foreach (var account in accounts)
                {
                    try
                    {
                        await _mediator.Send(new CreatePeriodicSalesOrders(account.Id), cancellationToken);
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "CreatePeriodicSalesOrders failed for account: {AccountId}", account.Id);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "CreateSalesOrdersJob Failed.");
                throw;
            }
        }
    }
}
