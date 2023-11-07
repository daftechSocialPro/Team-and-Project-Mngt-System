using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.Team;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Notice
{
    public class NoticeList : WithIdModel
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime EndDate { get; set; }

        public virtual EmployeeList Employee { get; set; }
        public Guid? ProjectId { get; set; }
        public virtual ProjectList Project { get; set; }
        public Guid? TeamId { get; set; }
        public virtual ProjectTeam Team { get; set; }

    }
}
