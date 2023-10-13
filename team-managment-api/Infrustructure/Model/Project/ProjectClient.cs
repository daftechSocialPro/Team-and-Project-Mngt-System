using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Client;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Project
{
    public class ProjectClient : WithIdModel
    {
        public virtual ClientList Client { get; set; }

        public Guid ClientId { get; set; }


        public virtual ProjectList Project { get; set; }

        public Guid ProjectId { get; set; }

    }
}
