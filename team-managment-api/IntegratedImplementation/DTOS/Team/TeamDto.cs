using IntegratedImplementation.DTOS.Configuration;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Team;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Team
{
    public record TeamGetDto
    {
        public Guid Id { get; set; }

        public string TeamName { get; set; } = null;

        public List<SelectMembersListDto>? TeamEmployees { get; set; }
        public List<SelectProjectsListDto>? TeamProjects { get; set; }



    }
    public record TeamPostDto
    {
        public string TeamName { get; set; } = null;
        
        public string CreatedById { get; set; } = null!;
        public List<Guid> ? TeamEmployees { get; set; }
        public List<Guid> ? TeamProjects { get; set; }

    }
}
