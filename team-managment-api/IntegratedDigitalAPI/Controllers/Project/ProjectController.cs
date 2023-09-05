using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Project;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
namespace IntegratedDigitalAPI.Controllers.Project
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {

            _projectService = projectService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjects()
        {
            return Ok(await _projectService.GetProjects());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProject([FromForm] ProjectPostDto project)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _projectService.AddProject(project));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("AddEmployeeToProject")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployeeToProject(AddToProjectDto addToProject)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _projectService.AddEmployeeToProject(addToProject));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> EditProject([FromForm] ProjectPostDto project)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _projectService.EditProject(project));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
