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

            CreateMap<ProjectTeam, TeamGetDto>()
                .ForMember(a => a.TeamEmployees, e=> e.MapFrom(mfg => mfg.TeamMembers));

            CreateMap<TeamEmployee, SelectMembersListDto>()
           .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Employee.Id))
           .ForMember(a => a.TeamId, e => e.MapFrom(mfg => mfg.PTeam.Id))
           .ForMember(a => a.Name, e => e.MapFrom(mfg => $"{mfg.Employee.FirstName} {mfg.Employee.LastName}"))
           ;

        }
    }
}
