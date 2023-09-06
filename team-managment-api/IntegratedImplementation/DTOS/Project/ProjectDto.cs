﻿using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Task;
using IntegratedInfrustructure.Model.Team;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Project
{
    public record ProjectGetDto
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime AssignedDate { get; set; }
        public DateTime DueDate { get; set; }
        public string ProjectStatus { get; set; } 
        public string AssignedTo { get; set; }

        public List<SelectListDto> TeamProjects { get; set; }
        public List<SelectProjectEmployeeListDto>? ProjectEmployees { get; set; }
        public List<TaskGetDto> TaskLists { get; set; }

    }

    public record ProjectPostDto
    {
        public Guid? Id { get; set; }
        public string ProjectName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime AssignedDate { get; set; }
        public DateTime DueDate { get; set; }
        public string ProjectStatus { get; set; }
        public string AssignedTo { get; set; }

        public Guid? TeamId { get; set; }
        
        public string CreatedById { get; set; } = null!;
        public List<Guid>? ProjectEmployees { get; set; }
        public List<Guid>? TaskLists { get; set; }
    }
}
