using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace Modilist.Functions.ScheduledJobs.Jobs.SalesOrdersDomain
{
    public class CreateSalesOrdersJob
    {
        [FunctionName(nameof(CreateSalesOrdersJob))]
        public async Task CreateSalesOrdersAsync([TimerTrigger("%CreateSalesOrdersCron%")] TimerInfo timer, ILogger logger, CancellationToken cancellationToken)
        {
        }
    }
}
