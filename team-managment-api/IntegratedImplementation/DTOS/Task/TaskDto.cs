using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Task
{
    public record TaskGetDto
    {
        public Guid Id { get; set; }
        public string TaskName { get; set; }
        public DateTime EndDate { get; set; }
        public string TaskStatuses { get; set; }
        public string TaskPriority { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid? ProjectId { get; set; }
        public string TaskDescription { get; set; }
        public string? EmployeeImagePath { get; set; }
        public string? EmployeeName { get; set; }
        public bool? IsOnHold { get; set; }
        public string? ProjectName { get; set; }
        public string CreatedById { get; set; } = null!;
        public string? TaskApproval { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public string? RejectionRemark { get; set; }
        public List<TaskFileGetDto>? TaskFiles { get; set; }
        public Guid? ComplaintId { get; set; }


    }

    public record TaskPostDto
    {
        public Guid? Id { get; set; }
        public string TaskName { get; set; }
        public DateTime EndDate { get; set; }
        public string TaskStatuses { get; set; }
        public string TaskPriority { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid? ProjectId { get; set; }
        public string TaskDescription { get; set; }
        public string CreatedById { get; set; } = null!;        
        public string? ProjectName { get; set; }
        public string? EmployeeName { get; set; }
        public List<IFormFile>? TaskFiles { get; set; }
        public Guid? ComplaintId { get; set; }

    }

    public record TaskStatusDto
    {
        public Guid Id { get; set; }
        public string TaskStatuses { get; set; }
        public bool IsOnHold { get; set; }
        public bool IsSeen { get; set; }
        public string TaskApproval { get; set; }
        public string? RejectionRemark { get; set; }
        public Guid? ComplaintId { get; set; }
    }

}
