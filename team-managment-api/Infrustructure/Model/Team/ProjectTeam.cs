using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.HRM;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntegratedInfrustructure.Model.Team
{
    public class ProjectTeam : WithIdModel
    {

        public ProjectTeam() 
        {
            TeamMembers = new HashSet<TeamEmployee>();
            TeamProjects = new HashSet<TeamProject>();

        }
        

        [InverseProperty(nameof(TeamEmployee.PTeam))]
        public ICollection<TeamEmployee> TeamMembers { get; set; }

        [InverseProperty(nameof(TeamProject.PTeam))]
        public ICollection<TeamProject> TeamProjects { get; set; }

        public string TeamName { get; set; } = null!;

    }
}
