using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Project;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Complaint
{
    public class ComplaintGetDto
    {
        public Guid? Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid ProjectId { get; set; }
        public ProjectGetDto Project { get; set; }
        public ClientGetDto Client { get; set; }
        public string ComplaintCode { get; set; }
        public string Description { get; set; }
        public string Subject { get; set; }
        public string? ComplaintType { get; set; }
        public string? ComplaintStatus { get; set; }
        public List<ComplaintFileGetDto>? ComplaintFiles { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<SelectListDto> AssignedEmployees { get; set; }
    }
    public class ComplaintPostDto
    {
        public Guid? Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid ProjectId { get; set; }
        public string Description { get; set; }
        public string Subject { get; set; }
        public string? ComplaintType { get; set; }
        public string? ComplaintStatus { get; set; }
        public List<IFormFile>? ComplaintFiles { get; set; }
        public string CreatedById { get; set; } = null!;


    }
}
