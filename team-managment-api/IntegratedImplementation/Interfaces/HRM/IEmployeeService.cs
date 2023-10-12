using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployeeService
    {

        Task<List<EmployeeGetDto>> GetEmployees();
        Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee);
        Task<ResponseMessage> UpdateEmployee(EmployeeGetDto addEmployee);
        Task<EmployeeGetDto> GetEmployee(Guid employeeId);
        Task<List<SelectListDto>> GetEmployeeNoUser();
        Task<List<SelectListDto>> GetEmployeeSelectList();
        Task<ResponseMessage> changeEmployeeImage(EmployeeImagePostDto addEmployee);




    }
}
