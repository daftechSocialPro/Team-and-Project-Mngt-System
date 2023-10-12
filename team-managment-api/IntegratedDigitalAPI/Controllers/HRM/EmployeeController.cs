using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
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
        [HttpGet("getEmployeeNoUser")]
        [ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeNoUser()
        {
            return Ok(await _employeeService.GetEmployeeNoUser());
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


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployee([FromForm] EmployeeGetDto employee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployee(employee));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("getEmployeesSelectList")]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeesSelectList()
        {
            return Ok(await _employeeService.GetEmployeeSelectList());
        }
        [HttpPut("changeEmployeeImage")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> changeEmployeeImage([FromForm]EmployeeImagePostDto addEmployee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.changeEmployeeImage(addEmployee));
            }
            else
            {
                return BadRequest();
            }
        }




    }
}
