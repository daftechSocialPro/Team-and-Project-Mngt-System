﻿using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        }

        [InverseProperty(nameof(TaskList.Project))]
        public ICollection<TaskList> TaskLists { get; set; }

        [InverseProperty(nameof(TeamProject.Project))]
        public ICollection<TeamProject> TeamProjects { get; set; }

        [InverseProperty(nameof(ProjectEmployee.Project))]
        public ICollection<ProjectEmployee> ProjectEmployees { get; set; }

        public string ProjectName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime AssignedDate { get; set; }
        public DateTime DueDate { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public AssignedTo AssignedTo { get; set; }

        
        

    }
}