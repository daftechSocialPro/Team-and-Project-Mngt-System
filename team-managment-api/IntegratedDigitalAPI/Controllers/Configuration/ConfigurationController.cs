﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Project;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        IGeneralConfigService _generalConfigService;
        public ConfigurationController(IGeneralConfigService generalConfigService)
        {

            _generalConfigService = generalConfigService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProject(IFormFile file, string name, string path)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _generalConfigService.UploadFiles(file, name, path));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}