using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Team
{
    public class TeamEmployee : WithIdModel
    {
        public virtual EmployeeList Employee { get; set; }

        public Guid EmployeeId { get; set; }


        public virtual ProjectTeam PTeam { get; set; }

        public Guid PTeamId { get; set; }
    }
}