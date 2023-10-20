using IntegratedInfrustructure.Model.Authentication;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.HRM;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntegratedInfrustructure.Model.Task
{
    public class TaskList : WithIdModel
    {
        public TaskList() 
        {
            TaskFiles = new HashSet<TaskFile>();
        }

        [InverseProperty(nameof(TaskFile.Task))]
        public ICollection<TaskFile> TaskFiles { get; set; }
        
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
        public TaskApproval TaskApproval { get; set; }
        public string? RejectionRemark { get; set; }
    }
}
