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
        Task<ProjectGetDto> GetProject(Guid projectId);
        Task<ResponseMessage> AddProject(ProjectPostDto addProject);
        Task<ResponseMessage> AddEmployeeToProject(AddToProjectDto addToProject);
        Task<ResponseMessage> EditProject(ProjectPostDto editProject);
        Task<List<SelectListDto>> GetProjectSelectList();
        Task<double> GetProjectProgress(Guid id);
        Task<List<ProjectGetDto>> GetEmpolyeesProjects(Guid employeeId);
        Task<List<double>> GetOverallProgress();
    }
}
