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

        public TaskService(ApplicationDbContext dbContext, IMapper mapper, IEmployeeService employeeService,IGeneralConfigService generalConfigService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _employeeService = employeeService;
            _generalConfig = generalConfigService;
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
                    var name = $"{Path.GetFileNameWithoutExtension(addTask.FilePath.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addTask.EmployeeName}";
                    if (addTask.FilePath != null)
                        path = _generalConfig.UploadFiles(addTask.FilePath, name, $"Files/Projects/{addTask.ProjectName}").Result.ToString();
                }
                else
                {
                    var name = $"{Path.GetFileNameWithoutExtension(addTask.FilePath.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addTask.TaskName}";
                    if (addTask.FilePath != null)
                        path = _generalConfig.UploadFiles(addTask.FilePath, name, $"Files/Tasks/{addTask.EmployeeName}").Result.ToString();

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
                var name = $"{Path.GetFileNameWithoutExtension(editTask.File.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editTask.EmployeeName}";
                if (editTask.File != null)
                    path = _generalConfig.UploadFiles(editTask.File, name, $"Files/Projects/{editTask.ProjectName}").Result.ToString();
            }
            else
            {
                var name = $"{Path.GetFileNameWithoutExtension(editTask.File.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editTask.TaskName}";
                if (editTask.File != null)
                    path = _generalConfig.UploadFiles(editTask.File, name, $"Files/Tasks/{editTask.EmployeeName}").Result.ToString();

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
                await _dbContext.SaveChangesAsync();
            }
            return new ResponseMessage
            {
                Message = "Task Status Updated Successfully",
                Success = true
            };
        }
    }
}
