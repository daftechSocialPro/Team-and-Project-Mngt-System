using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Complaint
{
    public class AssignComplaintDto
    {
        public ComplaintGetDto Complaint { get; set; }
        public DateTime EndDate { get; set; }
        public string TaskPriority { get; set; }
        public List<Guid>? EmployeeId { get; set; }
        public Guid? TeamId { get; set; }
        public string CreatedById { get; set; } = null!;
        
    }
}
