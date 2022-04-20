using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modilist.Business.CQRS.ProductDomain.Commands.DTOs
{
    public class CreateProductInputDTO
    {
        public string SKU { get; set; }

        public string Name { get; set; }
    }
}
