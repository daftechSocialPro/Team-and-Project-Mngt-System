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
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.Team;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using static IntegratedInfrustructure.Data.EnumList;
namespace IntegratedImplementation.Services.Project
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _dbContext;
        
        private readonly IMapper _mapper;
        public ProjectService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            
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
                var addToProject = new AddToProjectDto()
                {
                    employeeList = addProject.ProjectEmployees,
                    projectId = project.Id,
                    createdBy = addProject.CreatedById
                };
                await AddEmployeeToProject(addToProject);
            }
            


            return new ResponseMessage
            {

                Message = "Project Added Successfully",
                Success = true
            };
        }



        public async Task<ResponseMessage> AddEmployeeToProject(AddToProjectDto addToProject)
        {
            foreach (var emp in addToProject.employeeList.Distinct())
            {
                ProjectEmployee empInProject = new ProjectEmployee
                {
                    EmployeeId = emp,
                    ProjectId = addToProject.projectId,
                    CreatedById = addToProject.createdBy
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
                    var addToProject = new AddToProjectDto()
                    {
                        employeeList = editProject.ProjectEmployees,
                        projectId = project.Id,
                        createdBy = editProject.CreatedById
                    };
                    await AddEmployeeToProject(addToProject);
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

                    Message = "Project Updated Successfully",
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

        public async Task<List<SelectListDto>> GetProjectSelectList()
        {

            var projects = await _dbContext.Projects.ProjectTo<SelectListDto>(_mapper.ConfigurationProvider).ToListAsync();

            return projects;
        }

        public async Task<double> GetProjectProgress(Guid id)
        {
            var tasks = await _dbContext.Tasks.Where(u => u.ProjectId.Equals(id)).ToListAsync();
            var completedTasks = await _dbContext.Tasks.Where(u => u.ProjectId.Equals(id) && u.TaskStatuses.Equals(EnumList.TaskStatuses.COMPLETE)).ToListAsync();
            var taskSum = 0;
            var completeTaskSum = 0;
            foreach (var task in tasks.Distinct())
            {
                if (task.TaskPriority == EnumList.TaskPriority.HIGH)
                {
                    taskSum += 3;
                }
                else if (task.TaskPriority == EnumList.TaskPriority.MEDIUM)
                {
                    taskSum += 2;
                }
                else { taskSum += 1; }

            }
            foreach (var task in completedTasks.Distinct())
            {
                if (task.TaskPriority == EnumList.TaskPriority.HIGH)
                {
                    completeTaskSum += 3;
                }
                else if (task.TaskPriority == EnumList.TaskPriority.MEDIUM)
                {
                    completeTaskSum += 2;
                }
                else { completeTaskSum += 1; }

            }

            return (completeTaskSum / taskSum) * 100;

             
        }

    }
}
