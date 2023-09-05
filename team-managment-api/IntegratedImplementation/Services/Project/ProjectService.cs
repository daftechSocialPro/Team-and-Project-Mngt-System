using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Project;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Migrations;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.Team;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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
namespace IntegratedImplementation.Services.Project
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public ProjectService(ApplicationDbContext dbContext,UserManager<ApplicationUser> userManager,IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<ProjectGetDto>> GetProjects()
        {
            var projectList = await _dbContext.Projects.AsNoTracking()
                                    .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return projectList;
        }

        public async Task<ResponseMessage> AddProject(ProjectPostDto addProject)
        {
            
            if (addProject.TeamId != null)
            {
                ProjectList project = new ProjectList
                {
                    ProjectName = addProject.ProjectName,
                    Description = addProject.Description,
                    DueDate = addProject.DueDate,
                    ProjectStatus = Enum.Parse<ProjectStatus>(addProject.ProjectStatus),
                    AssignedTo = Enum.Parse<AssignedTo>(addProject.AssignedTo),
                    
                    Id = Guid.NewGuid(),
                    AssignedDate = DateTime.Now,
                    CreatedById = addProject.CreatedById,
                };

                await _dbContext.Projects.AddAsync(project);
                await _dbContext.SaveChangesAsync();
                TeamProject teamProject = new TeamProject
                {
                    ProjectId = project.Id,
                    PTeamId = addProject.TeamId,
                             CreatedById = addProject.CreatedById

                };
                await _dbContext.TeamProjects.AddAsync(teamProject);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                ProjectList project = new ProjectList
                {
                    ProjectName = addProject.ProjectName,
                    Description = addProject.Description,
                    DueDate = addProject.DueDate,
                    ProjectStatus = Enum.Parse<ProjectStatus>(addProject.ProjectStatus),
                    AssignedTo = Enum.Parse<AssignedTo>(addProject.AssignedTo),
                    Id = Guid.NewGuid(),
                    AssignedDate = DateTime.Now,
                    CreatedById = addProject.CreatedById,
                };

                await _dbContext.Projects.AddAsync(project);
                await _dbContext.SaveChangesAsync();
                await AddEmployeeToProject(addProject.ProjectEmployees, project.Id, addProject.CreatedById);
            }
            


            return new ResponseMessage
            {

                Message = "Project Added Successfully",
                Success = true
            };
        }



        public async Task<ResponseMessage> AddEmployeeToProject(List<Guid> employeeList, Guid projectId, string createdBy)
        {
            foreach (var emp in employeeList.Distinct())
            {
                ProjectEmployee empInProject = new ProjectEmployee
                {
                    EmployeeId = emp,
                    ProjectId = projectId,
                    CreatedById = createdBy
                };
                await _dbContext.ProjectEmployees.AddAsync(empInProject);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage
            {

                Message = "Employee(s) Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> EditProject(ProjectPostDto editProject)
        {
            var project = _dbContext.Projects.Find(editProject.Id);

            if (project != null)
            {
                project.ProjectName = editProject.ProjectName;
                project.Description = editProject.Description;
                project.DueDate = editProject.DueDate;
                project.ProjectStatus = Enum.Parse<ProjectStatus>(editProject.ProjectStatus);
                project.AssignedTo = Enum.Parse<AssignedTo>(editProject.AssignedTo);
                await _dbContext.SaveChangesAsync();
                if (editProject.AssignedTo == "EMPLOYEE")
                {
                    _dbContext.TeamProjects.RemoveRange(_dbContext.TeamProjects.Where(a => a.ProjectId.Equals(project.Id)));
                    await AddEmployeeToProject(editProject.ProjectEmployees, project.Id, project.CreatedById);
                    await _dbContext.SaveChangesAsync();

                }
                else
                {
                    TeamProject teamProject = new TeamProject
                    {
                        ProjectId = project.Id,
                        PTeamId = editProject.TeamId,
                        CreatedById = editProject.CreatedById

                    };
                    await _dbContext.TeamProjects.AddAsync(teamProject);

                    _dbContext.ProjectEmployees.RemoveRange(_dbContext.ProjectEmployees.Where(a => a.ProjectId.Equals(project.Id)));
                    await _dbContext.SaveChangesAsync();

                }


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

                    Message = "No Project Found",
                    Success = false
                };
            }
        }

    }
}
