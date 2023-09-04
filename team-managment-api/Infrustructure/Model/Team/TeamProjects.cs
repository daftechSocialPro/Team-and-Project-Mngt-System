using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntegratedInfrustructure.Model.Project;

namespace IntegratedInfrustructure.Model.Team
{
    public class TeamProject : WithIdModel
    {
        public virtual ProjectList Project { get; set; }

        public Guid PTeamId { get; set; }


        public virtual ProjectTeam PTeam { get; set; }

        public Guid ProjectId { get; set; }
    }
}