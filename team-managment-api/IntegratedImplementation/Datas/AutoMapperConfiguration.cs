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
using IntegratedInfrustructure.Model.Chat;
using IntegratedImplementation.DTOS.Chat;
using IntegratedInfrustructure.Model.Notice;
using IntegratedImplementation.DTOS.Notice;
using IntegratedInfrustructure.Model.Client;
using IntegratedImplementation.DTOS.Client;
using IntegratedInfrustructure.Model.Complaint;
using IntegratedImplementation.DTOS.Complaint;

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
                .ForMember(a => a.ProjectClients, e => e.MapFrom(mfg => mfg.ProjectClients))
                .ForMember(a => a.TeamProjects, e => e.MapFrom(mfg => mfg.TeamProjects))
                .ForMember(a => a.TaskLists, e => e.MapFrom(mfg => mfg.TaskLists))
                .ForMember(a => a.ProjectStatus, e => e.MapFrom(mfg => mfg.ProjectStatus.ToString()))
                .ForMember(a => a.AssignedTo, e => e.MapFrom(mfg => mfg.AssignedTo.ToString()));

            CreateMap<TeamEmployee, SelectMembersListDto>()
               .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Employee.Id))
               .ForMember(a => a.TeamId, e => e.MapFrom(mfg => mfg.PTeam.Id))
               .ForMember(a => a.Name, e => e.MapFrom(mfg => $"{mfg.Employee.FirstName} {mfg.Employee.LastName}"))
               .ForMember(a => a.ImagePath, e => e.MapFrom(mfg => mfg.Employee.ImagePath));

            CreateMap<TeamProject, SelectProjectsListDto>()
               .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.PTeam.Id))
               .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.Project.ProjectName))
               .ForMember(a => a.ProjectId, e => e.MapFrom(mfg => mfg.Project.Id));
            
            CreateMap<TeamProject, SelectListDto>()
               .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.PTeamId))
               .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.PTeam.TeamName));

            CreateMap<TaskList, TaskGetDto>()
                .ForMember(a => a.EmployeeName, e => e.MapFrom(mfg => $"{mfg.Employee.FirstName} {mfg.Employee.LastName}"))
                .ForMember(a => a.EmployeeImagePath, e => e.MapFrom(mfg => mfg.Employee.ImagePath))
                .ForMember(a => a.ProjectName, e => e.MapFrom(mfg => mfg.Project.ProjectName))
                .ForMember(a => a.TaskStatuses, e => e.MapFrom(mfg => mfg.TaskStatuses.ToString()))
                .ForMember(a => a.TaskPriority, e => e.MapFrom(mfg => mfg.TaskPriority.ToString()))
                ;
            
            CreateMap<ChatList, ChatGetDto>();

            CreateMap<NoticeList, NoticeGetDto>();

            CreateMap<TaskList, TaskStatusDto>()
                ;
            CreateMap<ClientList, ClientGetDto>()
                .ForMember(a => a.ContractStatus, e => e.MapFrom(mfg => mfg.ContractStatus.ToString()))
                ;

            CreateMap<ClientFile, ClientFileGetDto>();
            CreateMap<ProjectClient, ClientGetDto>()
                .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.Client.Name))
                .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Client.Id))
                .ForMember(a => a.Email, e => e.MapFrom(mfg => mfg.Client.Email))
                .ForMember(a => a.Address, e => e.MapFrom(mfg => mfg.Client.Address))
                .ForMember(a => a.ClientContacts, e => e.MapFrom(mfg => mfg.Client.ClientContacts))
                .ForMember(a => a.Description, e => e.MapFrom(mfg => mfg.Client.Description))
                .ForMember(a => a.PhoneNo, e => e.MapFrom(mfg => mfg.Client.PhoneNo))
                .ForMember(a => a.ImagePath, e => e.MapFrom(mfg => mfg.Client.ImagePath))
                .ForMember(a => a.ClientFiles, e => e.MapFrom(mfg => mfg.Client.ClientFiles))
                          ;

            CreateMap<ComplaintList, ComplaintGetDto>()
                .ForMember(a => a.ComplaintType, e => e.MapFrom(mfg => mfg.ComplaintType.ToString()))
                .ForMember(a => a.ComplaintStatus, e => e.MapFrom(mfg => mfg.ComplaintStatus.ToString()))
                ;

            CreateMap<ComplaintFile, ComplaintFileGetDto>();

            CreateMap<ClientContact, AddToClientDto>();
            CreateMap<ClientList, SelectListDto>();
            CreateMap<TaskFile, TaskFileGetDto>();
            CreateMap<ProjectFile, ProjectFileGetDto>();


        }
    }
}
