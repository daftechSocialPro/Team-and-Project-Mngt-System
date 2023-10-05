using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Task;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Task;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedImplementation.DTOS.Configuration;
using System.ComponentModel;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Helper.ChatHub;
using Microsoft.AspNetCore.SignalR;

namespace IntegratedImplementation.Services.Task
{
    public class TaskService : ITaskService
    {
        public class EmployeeTaskDto
        {
            public SelectListDto employee { get; set; }
            public List<TaskGetDto> tasks { get; set; }
        }
        private readonly ApplicationDbContext _dbContext;

        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;
        private readonly IGeneralConfigService _generalConfig;
        private IHubContext<ChatHub, IChatHubInterface> _chatService;

        public TaskService(ApplicationDbContext dbContext, IMapper mapper, IEmployeeService employeeService,IGeneralConfigService generalConfigService, IHubContext<ChatHub, IChatHubInterface> chatService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _employeeService = employeeService;
            _generalConfig = generalConfigService;
            _chatService = chatService;
        }

        public async Task<TaskGetDto> GetTask(Guid taskId)
        {
            var task = await _dbContext.Tasks.Where(x => x.Id.Equals(taskId)).AsNoTracking()
                                    .ProjectTo<TaskGetDto>(_mapper.ConfigurationProvider)
                                    .FirstAsync();

            return task;
        }
        public async Task<List<EmployeeTaskDto>> GetAllTasks()
        {
            var allTasks = new List<EmployeeTaskDto>();

            var allEmployees = await _employeeService.GetEmployees();
            foreach(var employee in allEmployees.Distinct())
            {
                var empTask = new EmployeeTaskDto();
                empTask.employee = new SelectListDto() { Id= employee.Id , Name = employee.FirstName +" "+employee.LastName, ImagePath = employee.ImagePath};
                empTask.tasks = new List<TaskGetDto>();

                empTask.tasks = await GetTasks(employee.Id);
                if (!empTask.tasks.Count.Equals(0)) 
                { allTasks.Add(empTask); }
                
            }
          
            return allTasks;
        }
        public async Task<List<TaskGetDto>> GetTasks(Guid employeeId)
        {
            var tasks = await _dbContext.Tasks.Where(x => x.EmployeeId == employeeId).AsNoTracking()
                .ProjectTo<TaskGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return tasks;
        }

        public async Task<List<TaskGetDto>> GetProjectTasks(Guid employeeId, Guid projectID)
        {
            var projectTasks = await _dbContext.Tasks.Where(x => x.EmployeeId == employeeId && x.ProjectId == projectID).AsNoTracking()
                .ProjectTo<TaskGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return projectTasks;
        }

        public async Task<ResponseMessage> AddTask(TaskPostDto addTask)
        {


            if (addTask.EndDate < DateTime.Now)
            {
                return new ResponseMessage
                {
                    Message = "Task End Date Should Be Later Than Todays' Date",
                    Success = false
                };
            }
            else
            {
                var id = Guid.NewGuid();
                var path = "";
                 
                if (addTask.ProjectId != null)
                {
                    
                    if (addTask.FilePath != null) {
                        var name = $"{Path.GetFileNameWithoutExtension(addTask.FilePath.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addTask.EmployeeName}";
                        path = _generalConfig.UploadFiles(addTask.FilePath, name, $"Files/Projects/{addTask.ProjectName}").Result.ToString();
                    }
                }
                else
                {
                    
                    if (addTask.FilePath != null) { 
                        var name = $"{Path.GetFileNameWithoutExtension(addTask.FilePath.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addTask.TaskName}";
                        path = _generalConfig.UploadFiles(addTask.FilePath, name, $"Files/Tasks/{addTask.EmployeeName}").Result.ToString();
                    }
                }

                TaskList task = new TaskList
                {
                    TaskName = addTask.TaskName,
                    Id = id,
                    CreatedDate = DateTime.Now,
                    EndDate = addTask.EndDate,
                    TaskStatuses = Enum.Parse<TaskStatuses>(addTask.TaskStatuses),
                    TaskPriority = Enum.Parse<TaskPriority>(addTask.TaskPriority),
                    CreatedById = addTask.CreatedById,
                    TaskDescription = addTask.TaskDescription,
                    EmployeeId = addTask.EmployeeId,
                    ProjectId = addTask.ProjectId,
                    FilePath= path,
                    TaskApproval= Enum.Parse<TaskApproval>("PENDING")

                };

                await _dbContext.Tasks.AddAsync(task);
                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {

                    Message = "Task Added Successfully",
                    Success = true
                };
            }
        }

        public async Task<ResponseMessage> EditTask(TaskGetDto editTask)
        {
            var path = "";

            if (editTask.ProjectId != null)
            {

                if (editTask.File != null)
                {
                    var name = $"{Path.GetFileNameWithoutExtension(editTask.File.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editTask.EmployeeName}";
                    path = _generalConfig.UploadFiles(editTask.File, name, $"Files/Projects/{editTask.ProjectName}").Result.ToString();
                }
            }
            else
            {

                if (editTask.File != null)
                {
                    var name = $"{Path.GetFileNameWithoutExtension(editTask.File.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editTask.TaskName}";
                    path = _generalConfig.UploadFiles(editTask.File, name, $"Files/Tasks/{editTask.EmployeeName}").Result.ToString();
                }
            }

            var task = _dbContext.Tasks.Find(editTask.Id);

            if (task != null)
            {
                task.TaskName = editTask.TaskName;
                task.EndDate = editTask.EndDate;
                task.TaskPriority = Enum.Parse<TaskPriority>(editTask.TaskPriority);
                task.TaskStatuses = Enum.Parse<TaskStatuses>(editTask.TaskStatuses);
                task.TaskDescription = editTask.TaskDescription;
                if (editTask.File != null)
                {
                    task.FilePath = path;
                }
                await _dbContext.SaveChangesAsync();
               
                if (editTask.TaskStatuses == "COMPLETE")
                {
                    await _chatService.Clients.Group("task").getTaskNotice(editTask, "task");
                }
            }

            return new ResponseMessage 
            { 
                Message = "Task Updated Successfully",
                Success = true 
            };
        }

        public async Task<ResponseMessage>ChangeStatus(TaskStatusDto editStatus)
        {
            var task = _dbContext.Tasks.Find(editStatus.Id);
            if(task != null)
            {
                task.TaskStatuses = Enum.Parse<TaskStatuses>(editStatus.TaskStatuses);
                task.IsOnHold= editStatus.IsOnHold;
                task.TaskApproval = Enum.Parse<TaskApproval>(editStatus.TaskApproval);
                task.RejectionRemark = editStatus.RejectionRemark;
                await _dbContext.SaveChangesAsync();
            }
           
            if (editStatus.TaskStatuses == "COMPLETE" && editStatus.TaskApproval =="PENDING")
            {
                var task2 = await GetTask(editStatus.Id);
                await _chatService.Clients.Group("task").getTaskNotice(task2, "task");
            }
            return new ResponseMessage
            {
                Message = "Task Status Updated Successfully",
                Success = true
            };
        }

        public async Task<List<TaskGetDto>> GetPendingCompletedTasks()
        {
            var tasks = await _dbContext.Tasks.Where(x => x.TaskStatuses.Equals(TaskStatuses.COMPLETE)
            && x.TaskApproval.Equals(TaskApproval.PENDING)).AsNoTracking()
                .ProjectTo<TaskGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return tasks;

        }
    }
}
