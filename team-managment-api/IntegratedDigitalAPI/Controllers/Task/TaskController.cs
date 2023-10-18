using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.Interfaces.Task;
using IntegratedImplementation.Services.Task;
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
        [HttpGet("GetTask")]
        [ProducesResponseType(typeof(TaskGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTask(Guid taskId)
        {
            return Ok(await _taskService.GetTask(taskId));
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
        public async Task<IActionResult> AddTask([FromForm] TaskPostDto addTask)
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
        public async Task<IActionResult> EditTask([FromForm] TaskPostDto editTask)
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
        [HttpPut("ChangeStatus")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeStatus(TaskStatusDto editStatus)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _taskService.ChangeStatus(editStatus));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpGet("GetPendingCompletedTasks")]
        [ProducesResponseType(typeof(TaskGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingCompletedTasks()
        {
            return Ok(await _taskService.GetPendingCompletedTasks());
        }
    }
}
