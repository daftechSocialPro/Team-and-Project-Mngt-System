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
        public TaskService(ApplicationDbContext dbContext, IMapper mapper, IEmployeeService employeeService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _employeeService = employeeService;
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

            //var code = await _generalConfig.GenerateCode(GeneralCodeType.TASKPREFIX);
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
                TaskList task = new TaskList
                {
                    TaskName = addTask.TaskName,
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    EndDate = addTask.EndDate,
                    TaskStatuses = Enum.Parse<TaskStatuses>(addTask.TaskStatuses),
                    TaskPriority = Enum.Parse<TaskPriority>(addTask.TaskPriority),
                    CreatedById = addTask.CreatedById,
                    TaskDescription = addTask.TaskDescription,
                    EmployeeId = addTask.EmployeeId,
                    ProjectId = addTask.ProjectId

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

        public async Task<ResponseMessage> EditTask(TaskPostDto editTask)
        {
            var task = _dbContext.Tasks.Find(editTask.Id);

            if (task != null)
            {
                task.TaskName = editTask.TaskName;
                task.EndDate = editTask.EndDate;
                task.TaskPriority = Enum.Parse<TaskPriority>(editTask.TaskPriority);
                task.TaskStatuses = Enum.Parse<TaskStatuses>(editTask.TaskStatuses);
                task.TaskDescription = editTask.TaskDescription;
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage 
            { 
                Message = "Task Updated Successfully",
                Success = true 
            };
        }
    }
}
