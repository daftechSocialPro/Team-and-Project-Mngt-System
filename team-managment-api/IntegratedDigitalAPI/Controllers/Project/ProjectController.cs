﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Project;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("GetProject")]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProject(Guid projectId)
        {
            return Ok(await _projectService.GetProject(projectId));
        }

        [HttpGet("GetEmpolyeesProjects")]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmpolyeesProjects(Guid employeeId)
        {
            return Ok(await _projectService.GetEmpolyeesProjects(employeeId));
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

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteProject(Guid projectId)
        {
            return Ok(await _projectService.DeleteProject(projectId));
        }

        [HttpGet("GetProjectSelectList")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectSelectList()
        {
            return Ok(await _projectService.GetProjectSelectList());
        }
        [HttpGet("GetProjectProgress")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectProgress(Guid id)
        {
            return Ok(await _projectService.GetProjectProgress(id));
        }
        [HttpGet("GetOverallProgress")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetOverallProgress()
        {
            return Ok(await _projectService.GetOverallProgress());
        }
    }
}
