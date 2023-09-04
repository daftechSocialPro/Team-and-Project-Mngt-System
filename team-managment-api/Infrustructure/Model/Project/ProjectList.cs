using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Model.Team;

namespace IntegratedInfrustructure.Model.Project
{
    public class ProjectList : WithIdModel

    {
        public string ProjectName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime AssignedDate { get; set; }
        public DateTime DueDate { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public AssignedTo AssignedTo { get; set; }

        public Guid? TeamId { get; set; }
        public virtual ProjectTeam Team { get; set; }
    }
}