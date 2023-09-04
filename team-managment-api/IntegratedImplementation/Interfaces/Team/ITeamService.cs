using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Team;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Team
{
    public interface ITeamService
    {
        Task<List<TeamGetDto>> GetTeams();
        Task<ResponseMessage> AddTeam(TeamPostDto addTeam);
        Task<ResponseMessage> AddTeamMember(List<Guid> employeeList, Guid teamid, string createdBy);
        Task<ResponseMessage> RemoveTeam(Guid teamid);
        Task<ResponseMessage> RemoveTeamMember(List<Guid> employeeList, Guid teamid);
        Task<ResponseMessage> EditTeam(TeamGetDto editTeam);
        Task<List<SelectListDto>> GetEmployeeNotInTeam(Guid teamid);
        Task<List<SelectMembersListDto>> GetTeamMembersSelectList(Guid teamid);

    }
}
