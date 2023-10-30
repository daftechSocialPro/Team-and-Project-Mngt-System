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
using IntegratedInfrustructure.Model.Project;
using Microsoft.VisualBasic.FileIO;

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


            if (addTask.EndDate >= DateTime.Today)
            {
                var id = Guid.NewGuid();
                var path = "";

                

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
                    TaskApproval = Enum.Parse<TaskApproval>("PENDING")

                };

                await _dbContext.Tasks.AddAsync(task);
                await _dbContext.SaveChangesAsync();
                if (addTask.ProjectId != null)
                {
                                        
                    if (addTask.TaskFiles != null && addTask.TaskFiles.Count > 0)
                    {
                        
                        foreach (var file in addTask.TaskFiles.Distinct())
                        {
                            var fileName = file.FileName;
                            var fileType = file.ContentType;
                            var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addTask.EmployeeName}";
                            path = _generalConfig.UploadFiles(file, name, $"Files/ProjectTasks/{addTask.ProjectName}").Result.ToString();
                            
                            TaskFile taskFile = new TaskFile
                            {
                                TaskId = id,
                                FileName = fileName,
                                FilePath = path,
                                FileType = fileType,
                                CreatedById = addTask.CreatedById
                            };
                            await _dbContext.TaskFiles.AddAsync(taskFile);
                        }
                        await _dbContext.SaveChangesAsync();

                    }
                }
                else
                {

                    
                    if (addTask.TaskFiles != null && addTask.TaskFiles.Count > 0)
                    {

                        foreach (var file in addTask.TaskFiles.Distinct())
                        {
                            var fileName = file.FileName;
                            var fileType = file.ContentType;
                            var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addTask.EmployeeName}";
                            path = _generalConfig.UploadFiles(file, name, $"Files/PersonalTasks/{addTask.EmployeeName}").Result.ToString();

                            TaskFile taskFile = new TaskFile
                            {
                                TaskId = id,
                                FileName = fileName,
                                FilePath = path,
                                FileType = fileType,
                                CreatedById = addTask.CreatedById
                            };
                            await _dbContext.TaskFiles.AddAsync(taskFile);
                        }
                        await _dbContext.SaveChangesAsync();

                    }

                }


                return new ResponseMessage
                {

                    Message = "Task Added Successfully",
                    Success = true,
                    Data = id
                };
            }
            else
            {
                return new ResponseMessage
                {
                    Message = "Task End Date Should Be Later Than Todays' Date",
                    Success = false
                };

            }
        }

        public async Task<ResponseMessage> EditTask(TaskPostDto editTask)
        {
            var path = "";

            
            var task = _dbContext.Tasks.Find(editTask.Id);

            if (task != null)
            {
                if (editTask.TaskStatuses != "COMPLETE" && task.TaskStatuses == TaskStatuses.COMPLETE)
                {
                    var task2 = await GetTask((Guid)editTask.Id);
                    await _chatService.Clients.Group("task").getTaskNotice(task2, "rmTask");
                }

                task.TaskName = editTask.TaskName;
                task.EndDate = editTask.EndDate;
                task.TaskPriority = Enum.Parse<TaskPriority>(editTask.TaskPriority);
                if (editTask.TaskStatuses != "COMPLETE" && task.TaskApproval != TaskApproval.APPROVED)
                {
                    task.TaskApproval = TaskApproval.PENDING;
                }
                
                task.TaskStatuses = Enum.Parse<TaskStatuses>(editTask.TaskStatuses);
                task.TaskDescription = editTask.TaskDescription;
                
                await _dbContext.SaveChangesAsync();
               
                
                if (editTask.ProjectId != null)
                {

                    if (editTask.TaskFiles != null && editTask.TaskFiles.Count > 0)
                    {

                        foreach (var file in editTask.TaskFiles.Distinct())
                        {
                            var fileName = file.FileName;
                            var fileType = file.ContentType;
                            var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editTask.EmployeeName}";
                            path = _generalConfig.UploadFiles(file, name, $"Files/ProjectTasks/{editTask.ProjectName}").Result.ToString();

                            TaskFile taskFile = new TaskFile
                            {
                                TaskId = task.Id,
                                FileName = fileName,
                                FilePath = path,
                                FileType = fileType,
                                CreatedById = editTask.CreatedById
                            };
                            await _dbContext.TaskFiles.AddAsync(taskFile);
                        }
                        await _dbContext.SaveChangesAsync();

                    }
                }
                else
                {


                    if (editTask.TaskFiles != null && editTask.TaskFiles.Count > 0)
                    {

                        foreach (var file in editTask.TaskFiles.Distinct())
                        {
                            var fileName = file.FileName;
                            var fileType = file.ContentType;
                            var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editTask.EmployeeName}";
                            path = _generalConfig.UploadFiles(file, name, $"Files/PersonalTasks/{editTask.EmployeeName}").Result.ToString();

                            TaskFile taskFile = new TaskFile
                            {
                                TaskId = task.Id,
                                FileName = fileName,
                                FilePath = path,
                                FileType = fileType,
                                CreatedById = editTask.CreatedById
                            };
                            await _dbContext.TaskFiles.AddAsync(taskFile);
                        }
                        await _dbContext.SaveChangesAsync();

                    }

                }
                if (editTask.TaskStatuses == "COMPLETE")
                {
                    var task2 = await _dbContext.Tasks.Where(u => u.Id == editTask.Id).AsNoTracking()
                                .ProjectTo<TaskGetDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
                    await _chatService.Clients.Group("task").getTaskNotice(task2, "task");
                }
                return new ResponseMessage
                {
                    Message = "Task Updated Successfully",
                    Success = true
                };
            }
            return new ResponseMessage
            {
                Message = "Task Not Found",
                Success = false
            };

        }

        public async Task<ResponseMessage>ChangeStatus(TaskStatusDto editStatus)
        {
            var task = _dbContext.Tasks.Find(editStatus.Id);

            if(task != null)
            {
                if (editStatus.TaskStatuses != "COMPLETE" && task.TaskStatuses == TaskStatuses.COMPLETE)
                {
                    var task2 = await GetTask(editStatus.Id);
                    await _chatService.Clients.Group("task").getTaskNotice(task2, "rmTask");
                }

                task.TaskStatuses = Enum.Parse<TaskStatuses>(editStatus.TaskStatuses);
                task.IsOnHold= editStatus.IsOnHold;
                if(editStatus.TaskStatuses != "COMPLETE" && task.TaskApproval != TaskApproval.APPROVED) {
                    task.TaskApproval = TaskApproval.PENDING;
                }
                else
                {
                    task.TaskApproval = Enum.Parse<TaskApproval>(editStatus.TaskApproval);

                }
                
                task.RejectionRemark = editStatus.RejectionRemark;
                await _dbContext.SaveChangesAsync();
            }
           
            if (editStatus.TaskStatuses == "COMPLETE" && editStatus.TaskApproval =="PENDING")
            {
                var task2 = await GetTask(editStatus.Id);
                await _chatService.Clients.Group("task").getTaskNotice(task2, "task");
            }
            if (editStatus.TaskStatuses == "COMPLETE" && (editStatus.TaskApproval == "APPROVED" || editStatus.TaskApproval == "REJECTED"))
            {
                var task2 = await GetTask(editStatus.Id);
                await _chatService.Clients.Group(task2.EmployeeId.ToString()).getUserTaskNotice(task2, editStatus.TaskApproval);
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
            //tasks.Reverse();
            return tasks;

        }
    }
}
