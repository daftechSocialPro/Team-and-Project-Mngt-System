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
            var id = Guid.NewGuid();


            ProjectList project = new ProjectList
            {
                ProjectName = addProject.ProjectName,
                Description = addProject.Description,
                DueDate = addProject.DueDate,
                ProjectStatus = Enum.Parse<ProjectStatus>(addProject.ProjectStatus),
                AssignedTo = Enum.Parse<AssignedTo>(addProject.AssignedTo),
                TeamId =addProject.TeamId,
                Id = Guid.NewGuid(),
                AssignedDate = DateTime.Now,
                CreatedById = addProject.CreatedById,
            };

            await _dbContext.Projects.AddAsync(project);
            await _dbContext.SaveChangesAsync();
            


            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }


    }
}
