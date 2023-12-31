﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Team;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;


namespace IntegratedDigitalAPI.Controllers.Team
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        ITeamService _teamService;
        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }
        [HttpGet]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTeams()
        {
            return Ok(await _teamService.GetTeams());
        }
        [HttpGet("GetEmployeesTeams")]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeesTeams(Guid employeeId)
        {
            return Ok(await _teamService.GetEmployeesTeams(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTeam( TeamPostDto team)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _teamService.AddTeam(team));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("AddTeamMember")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTeamMember( AddTeamDto addTeam)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _teamService.AddTeamMember(addTeam));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete("RemoveTeamMember")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RemoveTeamMember(RemoveTeamDto removeTeam)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _teamService.RemoveTeamMember(removeTeam));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateTeam( TeamEditDto team)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _teamService.EditTeam(team));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete("RemoveTeam")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RemoveTeam(Guid teamid)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _teamService.RemoveTeam(teamid));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("GetTeamMembersSelectList")]
        [ProducesResponseType(typeof(SelectMembersListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeesSelectList(Guid teamid)
        {
            return Ok(await _teamService.GetTeamMembersSelectList(teamid));
        }
        [HttpGet("GetEmployeeNotInTeam")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeNotInTeam(Guid teamid)
        {
            return Ok(await _teamService.GetEmployeeNotInTeam(teamid));
        }

        [HttpGet("GetTeamSelectList")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTeamSelectList()
        {
            return Ok(await _teamService.GetTeamSelectList());
        }

    }
}
