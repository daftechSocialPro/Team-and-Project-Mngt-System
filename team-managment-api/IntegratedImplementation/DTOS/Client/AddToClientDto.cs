using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Client
{
    public class AddToClientDto
    {
        
        public string Name { get; set; }
        public string Position { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string? CreatedById { get; set; } 
    }
}
