using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Team;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Team;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Team
{
    public class TeamService : ITeamService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public TeamService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<TeamGetDto>> GetTeams()
        {
            var teamList = await _dbContext.Teams.AsNoTracking()
                                    .ProjectTo<TeamGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return teamList;
        }

        public async Task<ResponseMessage> AddTeam(TeamPostDto addTeam)
        {
            var id = Guid.NewGuid();
           

            ProjectTeam team = new ProjectTeam
            {
                TeamName =addTeam.TeamName,
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addTeam.CreatedById,
            };

            await _dbContext.Teams.AddAsync(team);
            await _dbContext.SaveChangesAsync();
            await AddTeamMember(addTeam.TeamEmployees,team.Id,addTeam.CreatedById);
          

            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> AddTeamMember(List<Guid> employeeList, Guid teamid, string createdBy)
        {
            foreach (var emp in employeeList.Distinct())
            {
                TeamEmployee teamMember = new TeamEmployee
                {
                    EmployeeId = emp,
                    PTeamId =teamid,
                    CreatedById = createdBy
                };
                await _dbContext.TeamEmployees.AddAsync(teamMember);
                await _dbContext.SaveChangesAsync();
            }
            
            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }
        public async Task<ResponseMessage> RemoveTeam(Guid teamid)
        {
            var team = await _dbContext.Teams.Where(a => a.Id.Equals(teamid)).FirstOrDefaultAsync();
            if (team != null)
            {
                _dbContext.Teams.Remove(team);
                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {

                    Message = "Team Removed Successfully",
                    Success = true
                };
            }
            else
            {
                return new ResponseMessage
                {

                    Message = "No Team Found",
                    Success = false
                };
            }
        }

        public async Task<ResponseMessage> RemoveTeamMember(List<Guid> employeeList, Guid teamid)
        {
            var team = await _dbContext.Teams.Where(a => a.Id.Equals(teamid)).FirstOrDefaultAsync();
            if (team != null)
            {
                foreach (var emp in employeeList.Distinct())
                {
                    var removed = await _dbContext.TeamEmployees.Where(a => a.Id.Equals(emp) && a.PTeamId.Equals(teamid)).FirstOrDefaultAsync();
                    if (removed != null)
                    {
                    
                        _dbContext.TeamEmployees.Remove(removed);
                        await _dbContext.SaveChangesAsync();
                    }

                }
                return new ResponseMessage
                {

                    Message = "Team Member(s) Removed Successfully",
                    Success = true
                };
            }
            else
            {
                return new ResponseMessage
                {

                    Message = "No Team Found",
                    Success = false
                };
            }
        }


        public async Task<ResponseMessage> EditTeam(TeamGetDto editTeam)
        {
            var team = _dbContext.Teams.Find(editTeam.Id);

            if (team != null)
            {
                team.TeamName = editTeam.TeamName;


                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {

                    Message = "Updated Successfully",
                    Success = true
                };

            }
            else
            {
                return new ResponseMessage
                {

                    Message = "No Team Found",
                    Success = false
                };
            }
        }

        public async Task<List<SelectListDto>> GetEmployeeNotInTeam(Guid teamid)
        {
            var teams = _dbContext.TeamEmployees.Where(x => x.PTeamId == teamid).Select(x => x.EmployeeId).ToList();

            var employees = await _dbContext.Employees
                .Where(e => !teams.Contains(e.Id))
                .ProjectTo<SelectListDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return employees;
        }


        public async Task<List<SelectMembersListDto>> GetTeamMembersSelectList(Guid teamid)
        {

            var teamMembers = await _dbContext.TeamEmployees.Where(u => u.PTeamId.Equals(teamid)).ProjectTo<SelectMembersListDto>(_mapper.ConfigurationProvider).ToListAsync();

            return teamMembers;
        }


    }
}
