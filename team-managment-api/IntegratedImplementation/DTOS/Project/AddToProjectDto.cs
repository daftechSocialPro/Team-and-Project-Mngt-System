using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Project
{
    public record AddToProjectDto
    {
        public List<Guid>? employeeList { get; set; }
        public Guid projectId { get; set; }
        public string createdBy { get; set; }
    }
}

