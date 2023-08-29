using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployees()
        {
            return Ok(await _employeeService.GetEmployees());
        }
        [HttpGet("getEmployee")]
        [ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployee(Guid employeeId)
        {
            return Ok(await _employeeService.GetEmployee(employeeId));
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployee([FromForm] EmployeePostDto employee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.AddEmployee(employee));
            }
            else
            {
                return BadRequest();
            }
        }
      

     
        

    }
}
