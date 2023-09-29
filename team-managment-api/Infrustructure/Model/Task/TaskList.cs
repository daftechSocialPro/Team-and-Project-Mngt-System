using IntegratedInfrustructure.Model.Authentication;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.HRM;

namespace IntegratedInfrustructure.Model.Task
{
    public class TaskList : WithIdModel
    {
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime EndDate { get; set; }

        public bool IsOnHold { get; set; }
        public TaskStatuses TaskStatuses { get; set; }
        public TaskPriority TaskPriority { get; set; }
        public virtual EmployeeList Employee { get; set; }
        public Guid EmployeeId { get; set; } 
        public virtual ProjectList Project { get; set; }
        public Guid? ProjectId { get; set; }
        public string? FilePath { get; set; }
    }
}
