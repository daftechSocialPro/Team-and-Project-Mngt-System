using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Client
{
    public class ClientFile : WithIdModel
    {
        public virtual ClientList Client { get; set; }
        public Guid ClientId { get; set; }

        public string FileName { get; set; }
        public string FilePath { get; set; }


    }
}
