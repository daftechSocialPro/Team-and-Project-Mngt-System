using IntegratedInfrustructure.Model.Authentication;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Model.Team;
using System.ComponentModel.DataAnnotations.Schema;
using IntegratedInfrustructure.Model.Task;

namespace IntegratedInfrustructure.Model.Project
{
    public class ProjectList : WithIdModel

    {
        public ProjectList()
        {
            ProjectEmployees = new HashSet<ProjectEmployee>();
            TeamProjects = new HashSet<TeamProject>();
            TaskLists = new HashSet<TaskList>();
            ProjectClients = new HashSet<ProjectClient>();

        }

        [InverseProperty(nameof(TaskList.Project))]
        public ICollection<TaskList> TaskLists { get; set; }

        [InverseProperty(nameof(TeamProject.Project))]
        public ICollection<TeamProject> TeamProjects { get; set; }

        [InverseProperty(nameof(ProjectEmployee.Project))]
        public ICollection<ProjectEmployee> ProjectEmployees { get; set; }

        [InverseProperty(nameof(ProjectClient.Project))]
        public ICollection<ProjectClient> ProjectClients { get; set; }

        public string ProjectName { get; set; } = null!;
        public string? GitHubLink { get; set; }
        public string Description { get; set; } = null!;
        public DateTime AssignedDate { get; set; }
        public DateTime DueDate { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public AssignedTo AssignedTo { get; set; }
        public DateTime? CompletionDate { get; set; }
        public string? CompletionRemark { get; set; }


        
        

    }
}