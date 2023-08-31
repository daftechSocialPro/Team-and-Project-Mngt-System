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


        }
    }
}
