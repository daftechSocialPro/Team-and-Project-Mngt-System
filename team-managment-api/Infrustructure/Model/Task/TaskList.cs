using System.Collections.Generic;
using IntegratedInfrustructure.Model.Authentication;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Model.Project;
using System.ComponentModel.DataAnnotations.Schema;
using IntegratedInfrustructure.Model.HRM;

namespace IntegratedInfrustructure.Model.Task
{
    public class TaskList : WithIdModel
    {
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime EndDate { get; set; }
        public TaskStatuses TaskStatuses { get; set; }
        public TaskPriority TaskPriority { get; set; }
        public virtual EmployeeList Employee { get; set; }

        public Guid EmployeeId { get; set; } 

        public virtual ProjectList Project { get; set; }
        public Guid? ProjectId { get; set; }
    }
}
