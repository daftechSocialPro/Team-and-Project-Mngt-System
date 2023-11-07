using Implementation.Helper;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.Services.Task;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Configuration;


namespace IntegratedImplementation.Interfaces.Task
{
    public interface ITaskService
    {
        Task<TaskGetDto> GetTask(Guid taskId);
        Task<List<TaskService.EmployeeTaskDto>> GetAllTasks();
        Task<List<TaskGetDto>> GetTasks(Guid employeeId);
        Task<List<TaskGetDto>> GetProjectTasks(Guid employeeId, Guid projectID);
        Task<ResponseMessage> AddTask(TaskPostDto addTask);
        Task<ResponseMessage> EditTask(TaskPostDto editTask);
        Task<ResponseMessage> ChangeStatus(TaskStatusDto editStatus);
        Task<ResponseMessage> DeleteTask(Guid taskId);
        Task<List<TaskGetDto>> GetPendingCompletedTasks();
        System.Threading.Tasks.Task GenerateWeeklyReport();

    }
}
