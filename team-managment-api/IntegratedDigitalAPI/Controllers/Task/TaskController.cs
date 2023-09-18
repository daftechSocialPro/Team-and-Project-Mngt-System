using Implementation.Helper;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.Interfaces.Task;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Task
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpGet]
        [ProducesResponseType(typeof(TaskGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTasks(Guid employeeId)
        {
            return Ok(await _taskService.GetTasks(employeeId));
        }
        [HttpGet("GetAllTasks")]
        [ProducesResponseType(typeof(TaskGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllTasks()
        {
            return Ok(await _taskService.GetAllTasks());
        }
        [HttpGet("GetProjectTasks")]
        [ProducesResponseType(typeof(TaskGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectTask(Guid employeeId, Guid projectId)
        {
            return Ok(await _taskService.GetProjectTasks(employeeId, projectId));
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTask(TaskPostDto addTask)
        {
            if (ModelState.IsValid) 
            {
                return Ok(await _taskService.AddTask(addTask));
            }
            else
            {
                return BadRequest(ModelState);
            }
            
        }
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> EditTask(TaskPostDto editTask)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _taskService.EditTask(editTask));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
