using Implementation.Helper;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.DTOS.Configuration;


namespace IntegratedImplementation.Interfaces.Task
{
    public interface ITaskService
    {
        Task<List<TaskGetDto>> GetAllTasks();
        Task<List<TaskGetDto>> GetTasks(Guid employeeId);
        Task<List<TaskGetDto>> GetProjectTasks(Guid employeeId, Guid projectID);
        Task<ResponseMessage> AddTask(TaskPostDto addTask);
        Task<ResponseMessage> EditTask(TaskPostDto editTask);

    }
}
