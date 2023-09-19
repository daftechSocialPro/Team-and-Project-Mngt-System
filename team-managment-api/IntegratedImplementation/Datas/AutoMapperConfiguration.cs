using AutoMapper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

using IntegratedInfrustructure.Data;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedInfrustructure.Model.Team;
using IntegratedImplementation.DTOS.Team;
using IntegratedInfrustructure.Model.Project;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Task;
using IntegratedInfrustructure.Model.Task;

namespace IntegratedImplementation.Datas
{
    public class AutoMapperConfigurations : Profile
    {

        public AutoMapperConfigurations()
        {

            CreateMap<EmployeeList, EmployeeGetDto>()
                .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
               
                .ForMember(a => a.Gender, e => e.MapFrom(mfg => mfg.Gender.ToString()))
                .ForMember(a => a.EmploymentPosition, e => e.MapFrom(mfg => mfg.EmploymentPosition.ToString()))
                .ForMember(a => a.EmploymentStatus, e => e.MapFrom(mfg => mfg.EmploymentStatus.ToString()));

            CreateMap<EmployeeList, SelectListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => $"{mfg.FirstName} {mfg.LastName}"));

            CreateMap<ProjectList, SelectListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.ProjectName));

            

            CreateMap<ProjectTeam, SelectListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.TeamName));

            CreateMap<ProjectEmployee, SelectProjectEmployeeListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Employee.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => $"{mfg.Employee.FirstName} {mfg.Employee.LastName}"))
           .ForMember(a => a.ImagePath, e => e.MapFrom(mfg => mfg.Employee.ImagePath));


            CreateMap<ProjectTeam, TeamGetDto>()
                .ForMember(a => a.TeamEmployees, e => e.MapFrom(mfg => mfg.TeamMembers))
                .ForMember(a => a.TeamProjects, e => e.MapFrom(mfg => mfg.TeamProjects));

            

            CreateMap<ProjectList, ProjectGetDto>()
                .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
                .ForMember(a => a.ProjectEmployees, e => e.MapFrom(mfg => mfg.ProjectEmployees))
                .ForMember(a => a.TeamProjects, e => e.MapFrom(mfg => mfg.TeamProjects))
                .ForMember(a => a.TaskLists, e => e.MapFrom(mfg => mfg.TaskLists))
                .ForMember(a => a.ProjectStatus, e => e.MapFrom(mfg => mfg.ProjectStatus.ToString()))
                .ForMember(a => a.AssignedTo, e => e.MapFrom(mfg => mfg.AssignedTo.ToString()));
                


            CreateMap<TeamEmployee, SelectMembersListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Employee.Id))
           .ForMember(a => a.TeamId, e => e.MapFrom(mfg => mfg.PTeam.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => $"{mfg.Employee.FirstName} {mfg.Employee.LastName}"))
           .ForMember(a => a.ImagePath, e => e.MapFrom(mfg => mfg.Employee.ImagePath))
            ;
            CreateMap<TeamProject, SelectProjectsListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.PTeam.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.Project.ProjectName))
           .ForMember(a => a.ProjectId, e => e.MapFrom(mfg => mfg.Project.Id))
            ;
            CreateMap<TeamProject, SelectListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.PTeamId))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.PTeam.TeamName));

            CreateMap<TaskList, TaskGetDto>()
                .ForMember(a => a.EmployeeName, e => e.MapFrom(mfg => $"{mfg.Employee.FirstName} {mfg.Employee.LastName}"))
                .ForMember(a => a.EmployeeImagePath, e => e.MapFrom(mfg => mfg.Employee.ImagePath))
                .ForMember(a => a.TaskStatuses, e => e.MapFrom(mfg => mfg.TaskStatuses.ToString()))
                .ForMember(a => a.TaskPriority, e => e.MapFrom(mfg => mfg.TaskPriority.ToString()));

            
        }
    }
}
