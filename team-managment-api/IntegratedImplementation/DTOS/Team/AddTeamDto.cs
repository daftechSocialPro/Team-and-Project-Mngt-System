using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Team
{
    public record AddTeamDto
    {
        public List<Guid>? employeeList { get; set; }
        public Guid teamId { get; set; }
        public string createdBy { get; set; }
    }

    public record RemoveTeamDto
    {
        public List<Guid> employeeList { get; set; }
        public Guid teamId { get; set; }
    }
}
