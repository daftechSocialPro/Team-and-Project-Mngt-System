using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Client
{
    public class ClientContact : WithIdModel
    {
        public virtual ClientList Client { get; set; }
        public Guid ClientId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }

    }
}
