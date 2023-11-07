using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Client;
using IntegratedImplementation.Interfaces.Project;
using IntegratedImplementation.Services.Project;
using IntegratedInfrustructure.Migrations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        IClientService _clientService;
        public ClientController(IClientService clientService)
        {

            _clientService = clientService;
        }
        [HttpGet]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetClients()
        {
            return Ok(await _clientService.GetClients());
        }
        [HttpGet("GetClient")]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetClient(Guid id)
        {
            return Ok(await _clientService.GetClient(id));
        }
        [HttpGet("getClientNoUser")]
        [ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetClientNoUser()
        {
            return Ok(await _clientService.GetClientNoUser());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddClient([FromForm] ClientPostDto client)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _clientService.AddClient(client));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateClient([FromForm] ClientPostDto client)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _clientService.EditClient(client));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteClient(Guid clientId)
        {
            return Ok(await _clientService.DeleteClient(clientId));
        }

        [HttpPost("addContactsToClient")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddContactToClient(List<AddToClientDto> addToClient)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _clientService.AddContactToClient(addToClient));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
