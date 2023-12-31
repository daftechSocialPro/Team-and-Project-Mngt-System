﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Project;
using IntegratedImplementation.Interfaces.Team;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Migrations;
using IntegratedInfrustructure.Model.Complaint;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.Team;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic.FileIO;
using System.Data;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Project
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITeamService _teamService;
        private readonly IMapper _mapper;
        private readonly IGeneralConfigService _generalConfig;
        public ProjectService(ApplicationDbContext dbContext, IMapper mapper, ITeamService teamService, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _teamService= teamService;
            _mapper = mapper;
            _generalConfig = generalConfig;
        }

        public async Task<List<ProjectGetDto>> GetProjects()
        {
            var projectList = await _dbContext.Projects.AsNoTracking()
                                    .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return projectList;
        }
        public async Task<ProjectGetDto> GetProject(Guid projectId)
        {
            var project = await _dbContext.Projects.Where(x=>x.Id.Equals(projectId)).AsNoTracking()
                                    .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider)
                                    .FirstAsync();
            return project;
        }
        public async Task<List<ProjectGetDto>> GetEmpolyeesProjects(Guid employeeId)
        {
            var projectList = await _dbContext.ProjectEmployees.Where(x => x.EmployeeId.Equals(employeeId)).Select(u => u.Project).AsNoTracking()
                                    .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            var employeesTeams = await _teamService.GetEmployeesTeams(employeeId);
            foreach(var employeeTeam in employeesTeams) 
            { 
                var teamProjectList = await _dbContext.TeamProjects.Where(u => u.PTeamId.Equals(employeeTeam.Id)).Select(x => x.Project).AsNoTracking()
                                        .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider).ToListAsync();
                projectList.AddRange(teamProjectList);
            }
            
            return projectList;
        }
        public async Task<ResponseMessage> AddProject(ProjectPostDto addProject)
        {
            if (addProject.DueDate < addProject.AssignedDate)

            {
                return new ResponseMessage
                {

                    Message = "Project Due Date Should Be Later Than Assigned Date",
                    Success = false
                };
            }
            else
            {
                var id = Guid.NewGuid();

                if (addProject.TeamId != null)
                {
                    ProjectList project = new ProjectList
                    {
                        ProjectName = addProject.ProjectName,
                        Description = addProject.Description,
                        DueDate = addProject.DueDate,
                        ProjectStatus = Enum.Parse<ProjectStatus>(addProject.ProjectStatus),
                        AssignedTo = Enum.Parse<AssignedTo>(addProject.AssignedTo),
                        GitHubLink = addProject.GitHubLink,
                        Id = id,
                        AssignedDate = addProject.AssignedDate,
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
                        Id = id,
                        AssignedDate = DateTime.Now,
                        GitHubLink = addProject.GitHubLink,
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
                if (addProject.ProjectClients != null)
                {
                    var addToProject = new AddToProjectDto()
                    {
                        employeeList = addProject.ProjectClients,
                        projectId = id,
                        createdBy = addProject.CreatedById
                    };
                    await AddClientToProject(addToProject);
                    await _dbContext.SaveChangesAsync();
                }
                if (addProject.ProjectFiles != null && addProject.ProjectFiles.Count > 0)
                {
                    var path = "";
                    foreach (var file in addProject.ProjectFiles.Distinct())
                    {
                        var fileName = file.FileName;
                        var fileType = file.ContentType;
                        var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addProject.ProjectName}";
                        path = _generalConfig.UploadFiles(file, name, $"Files/ProjectFiles/{addProject.ProjectName}").Result.ToString();
                        ProjectFile projectFile = new ProjectFile
                        {
                            ProjectId = id,
                            FileName = fileName,
                            FilePath = path,
                            FileType = fileType,
                            CreatedById = addProject.CreatedById
                        };
                        await _dbContext.ProjectFiles.AddAsync(projectFile);
                    }
                    await _dbContext.SaveChangesAsync();

                }



                return new ResponseMessage
                {

                    Message = "Project Added Successfully",
                    Success = true
                };
            }
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
        public async Task<ResponseMessage> AddClientToProject(AddToProjectDto addToProject)
        {
            foreach (var emp in addToProject.employeeList.Distinct())
            {
                ProjectClient clients = new ProjectClient
                {
                    ClientId = emp,
                    ProjectId = addToProject.projectId,
                    CreatedById = addToProject.createdBy
                };
                await _dbContext.ProjectClients.AddAsync(clients);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage
            {

                Message = "Clients Added Successfully",
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
                project.AssignedDate = editProject.AssignedDate;
                project.DueDate = editProject.DueDate;
                project.ProjectStatus = Enum.Parse<ProjectStatus>(editProject.ProjectStatus);
                project.AssignedTo = Enum.Parse<AssignedTo>(editProject.AssignedTo);
                project.GitHubLink= editProject.GitHubLink;
                if (editProject.ProjectStatus == "COMPLETED")
                {
                    project.CompletionDate = DateTime.Now;
                    project.CompletionRemark = editProject.CompletionRemark;

                }
                await _dbContext.SaveChangesAsync();
                if (editProject.AssignedTo == "EMPLOYEE")
                {
                    _dbContext.ProjectEmployees.RemoveRange(_dbContext.ProjectEmployees.Where(a => a.ProjectId.Equals(project.Id)));
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
                    
                    _dbContext.TeamProjects.RemoveRange(_dbContext.TeamProjects.Where(a => a.ProjectId.Equals(project.Id)));
                    _dbContext.ProjectEmployees.RemoveRange(_dbContext.ProjectEmployees.Where(a => a.ProjectId.Equals(project.Id)));
                    await _dbContext.TeamProjects.AddAsync(teamProject);
                    await _dbContext.SaveChangesAsync();

                }
                if (editProject.ProjectClients != null)
                {
                    var addToProject = new AddToProjectDto()
                    {
                        employeeList = editProject.ProjectClients,
                        projectId = project.Id,
                        createdBy = editProject.CreatedById
                    };
                    await AddClientToProject(addToProject);
                    await _dbContext.SaveChangesAsync();
                }
                if (editProject.ProjectFiles != null && editProject.ProjectFiles.Count > 0)
                {
                    var path = "";
                    foreach (var file in editProject.ProjectFiles.Distinct())
                    {
                        var fileName = file.FileName;
                        var fileType = file.ContentType;
                        var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editProject.ProjectName}";
                        path = _generalConfig.UploadFiles(file, name, $"Files/ProjectFiles/{editProject.ProjectName}").Result.ToString();
                        ProjectFile projectFile = new ProjectFile
                        {
                            ProjectId = project.Id,
                            FileName = fileName,
                            FilePath = path,
                            FileType = fileType,
                            CreatedById = editProject.CreatedById
                        };
                        await _dbContext.ProjectFiles.AddAsync(projectFile);
                    }
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
            double projectProgress = 0;
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
            if (taskSum == 0) { return 0; }
            else
            {
                projectProgress = (double)completeTaskSum / taskSum * 100;
                return projectProgress;
            }
             
        }

        public async Task<List<double>?> GetOverallProgress()
        {
            var allprojects = await _dbContext.Projects.AsNoTracking()
                                    .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            var completedProjects = await _dbContext.Projects.Where(x => x.ProjectStatus.Equals(ProjectStatus.COMPLETED)).AsNoTracking()
                                    .ProjectTo<ProjectGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            var compBeforeDue = new List<ProjectGetDto>();
            foreach (var project in completedProjects) { 
                if(project.CompletionDate <= project.DueDate)
                {
                    compBeforeDue.Add(project);
                }
            
            }
            var progress = new List<double>();

            if (!completedProjects.IsNullOrEmpty())
            {
                var temp2 = ((compBeforeDue.Count / (double)completedProjects.Count) * 100);
                progress.Add(temp2);
            }
            if (!allprojects.IsNullOrEmpty()) { 
                var temp = (completedProjects.Count / (double)allprojects.Count) * 100;
            
                progress.Add(temp);
            }

            return progress;

         
        }

        public async Task<ResponseMessage> DeleteProject(Guid projectId)
        {
            var project = await _dbContext.Projects.Where(x => x.Id.Equals(projectId)).FirstAsync();

            if (project != null)
            {
                _dbContext.Projects.Remove(project);

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Message = "Project Deleted Successfully",
                    Success = true
                };

            }
            return new ResponseMessage
            {
                Message = "Project Not Found",
                Success = false
            };

        }


    }
}
