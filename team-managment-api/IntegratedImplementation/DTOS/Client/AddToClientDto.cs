using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Client
{
    public class AddToClientDto
    {
        public Guid ClientId { get; set; }
        public string name { get; set; }
        public string position { get; set; }
        public string phoneNo { get; set; }
        public string email { get; set; }
    }
        
}
