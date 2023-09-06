using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Project;
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
        
        private readonly IMapper _mapper;
        public TeamService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            
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
            var AddTeamDto = new AddTeamDto
            {
                employeeList = addTeam.TeamEmployees,
                teamId = team.Id,
                createdBy = addTeam.CreatedById

            };
            await AddTeamMember(AddTeamDto);

            foreach (var a in addTeam.TeamProjects.Distinct())
            {
                TeamProject teamProject = new TeamProject
                {
                    ProjectId = a,
                    PTeamId = team.Id,
                    CreatedById = addTeam.CreatedById

                };
                await _dbContext.TeamProjects.AddAsync(teamProject);
                await _dbContext.SaveChangesAsync();
            }


            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }

        

        public async Task<ResponseMessage> AddTeamMember(AddTeamDto addTeam)
        {
            foreach (var emp in addTeam.employeeList.Distinct())
            {
                TeamEmployee teamMember = new TeamEmployee
                {
                    EmployeeId = emp,
                    PTeamId =addTeam.teamId,
                    CreatedById = addTeam.createdBy
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

        public async Task<ResponseMessage> RemoveTeamMember(RemoveTeamDto removeTeam)
        {
            var team = await _dbContext.Teams.Where(a => a.Id.Equals(removeTeam.teamId)).FirstOrDefaultAsync();
            if (team != null)
            {
                foreach (var emp in removeTeam.employeeList.Distinct())
                {
                    var removed = await _dbContext.TeamEmployees.Where(a => a.EmployeeId.Equals(emp) && a.PTeamId.Equals(removeTeam.teamId)).FirstOrDefaultAsync();
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

        public async Task<List<SelectListDto>> GetEmployeeNotInTeam(Guid teamId)
        {
            var teams = _dbContext.TeamEmployees.Where(x => x.PTeamId == teamId).Select(x => x.EmployeeId).ToList();

            var employees = await _dbContext.Employees
                .Where(e => !teams.Contains(e.Id))
                .ProjectTo<SelectListDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return employees;
        }


        public async Task<List<SelectMembersListDto>> GetTeamMembersSelectList(Guid teamId)
        {

            var teamMembers = await _dbContext.TeamEmployees.Where(u => u.PTeamId.Equals(teamId)).ProjectTo<SelectMembersListDto>(_mapper.ConfigurationProvider).ToListAsync();

            return teamMembers;
        }

        public async Task<List<SelectListDto>> GetTeamSelectList()
        {

            var teams = await _dbContext.Teams.ProjectTo<SelectListDto>(_mapper.ConfigurationProvider).ToListAsync();

            return teams;
        }

    }
}
