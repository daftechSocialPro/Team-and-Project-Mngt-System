using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Project
{
    public class ProjectEmployee : WithIdModel
    {

        public virtual EmployeeList Employee { get; set; }

        public Guid EmployeeId { get; set; }


        public virtual ProjectList Project { get; set; }

        public Guid ProjectId { get; set; }


    }
}