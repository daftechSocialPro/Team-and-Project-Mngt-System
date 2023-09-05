using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Project;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Project
{
    public interface IProjectService
    {
        Task<List<ProjectGetDto>> GetProjects();
        Task<ResponseMessage> AddProject(ProjectPostDto addProject);
        Task<ResponseMessage> AddEmployeeToProject(List<Guid> employeeList, Guid projectid, string createdBy);
        Task<ResponseMessage> EditProject(ProjectPostDto editProject);

    }
}
