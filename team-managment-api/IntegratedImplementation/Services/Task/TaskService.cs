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
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Helper.ChatHub;
using Microsoft.AspNetCore.SignalR;
using Hangfire;
using QuestPDF;
using QuestPDF.Fluent;
using QuestPDF.Previewer;
using QuestPDF.Helpers;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using IntegratedImplementation.Helper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
        

        public TaskService(ApplicationDbContext dbContext, IMapper mapper, IEmployeeService employeeService, IGeneralConfigService generalConfigService, IHubContext<ChatHub, IChatHubInterface> chatService)
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
            foreach (var employee in allEmployees.Distinct())
            {
                var empTask = new EmployeeTaskDto();
                empTask.employee = new SelectListDto() { Id = employee.Id, Name = employee.FirstName + " " + employee.LastName, ImagePath = employee.ImagePath };
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

        public async Task<ResponseMessage> ChangeStatus(TaskStatusDto editStatus)
        {
            var task = _dbContext.Tasks.Find(editStatus.Id);

            if (task != null)
            {
                if (editStatus.TaskStatuses != "COMPLETE" && task.TaskStatuses == TaskStatuses.COMPLETE)
                {
                    var task2 = await GetTask(editStatus.Id);
                    await _chatService.Clients.Group("task").getTaskNotice(task2, "rmTask");
                }

                task.TaskStatuses = Enum.Parse<TaskStatuses>(editStatus.TaskStatuses);
                task.IsOnHold = editStatus.IsOnHold;
                if (editStatus.TaskStatuses != "COMPLETE" && task.TaskApproval != TaskApproval.APPROVED)
                {
                    task.TaskApproval = TaskApproval.PENDING;
                }
                else
                {
                    task.TaskApproval = Enum.Parse<TaskApproval>(editStatus.TaskApproval);

                }

                task.RejectionRemark = editStatus.RejectionRemark;
                await _dbContext.SaveChangesAsync();
            }

            if (editStatus.TaskStatuses == "COMPLETE" && editStatus.TaskApproval == "PENDING")
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


        public async Task<ResponseMessage> DeleteTask(Guid taskId)
        {
            var task = await _dbContext.Tasks.Where(x => x.Id.Equals(taskId)).FirstAsync();

            if (task != null)
            {
                 _dbContext.Tasks.Remove(task);

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Message = "Task Deleted Successfully",
                    Success = true
                };

            }
            return new ResponseMessage
            {
                Message = "Task Not Found",
                Success = false
            };

        }


        [AutomaticRetry(Attempts = 3)] // Retry the job up to 3 times on failure
        [Obsolete]
        public async System.Threading.Tasks.Task GenerateWeeklyReport()
        {
            DateTime currentDate = DateTime.Now;
            DateTime startOfWeek = currentDate.AddDays(-(int)currentDate.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(6);

            var startedTasksForWeek = _dbContext.Tasks.Where(t => t.CreatedDate >= startOfWeek && t.CreatedDate <= endOfWeek);
            var finishedTasksForWeek = _dbContext.Tasks.Where(t => t.EndDate >= startOfWeek && t.EndDate <= endOfWeek);

            var finishedTasksForWeekList = await _dbContext.Tasks.Where(t => t.EndDate >= startOfWeek && t.EndDate <= endOfWeek).AsNoTracking()
                .ProjectTo<TaskGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            var finishedTasksForWeekList2 = finishedTasksForWeekList.GroupBy(t => t.EmployeeName);

            var startedTaskCountByEmployee = startedTasksForWeek.GroupBy(t => t.Employee.FirstName + " " + t.Employee.LastName)
                                             .Select(g => new
                                                {
                                                    EmployeeName = g.Key,
                                                    TaskCount = g.Count()
                                                })
                                                .ToList();
            var finishedTaskCountByEmployee = finishedTasksForWeek.GroupBy(t => t.Employee.FirstName +" "+ t.Employee.LastName)
                                                .Select(g => new
                                                        {
                                                            EmployeeName = g.Key,
                                                            TaskCount = g.Count()
                                                        }).ToList();

            var completedTaskCountByEmployee = finishedTasksForWeek
                                                .Where(t => t.TaskStatuses == TaskStatuses.COMPLETE)
                                                .GroupBy(t => t.Employee.FirstName +" "+ t.Employee.LastName)
                                                .Select(g => new
                                                {
                                                    EmployeeName = g.Key,
                                                    CompletedTaskCount = g.Count()
                                                })
                                                .ToList();
            var inprogressTaskCountByEmployee = finishedTasksForWeek
                                                .Where(t => t.TaskStatuses == TaskStatuses.INPROGRESS)
                                                .GroupBy(t => t.Employee.FirstName +" "+ t.Employee.LastName)
                                                .Select(g => new
                                                {
                                                    EmployeeName = g.Key,
                                                    InprogressTaskCount = g.Count()
                                                })
                                                .ToList();
            var notstartedTaskCountByEmployee = finishedTasksForWeek
                                                .Where(t => t.TaskStatuses == TaskStatuses.NOTSTARTED)
                                                .GroupBy(t => t.Employee.FirstName +" "+ t.Employee.LastName)
                                                .Select(g => new
                                                {
                                                    EmployeeName = g.Key,
                                                    NotstartedTaskCount = g.Count()
                                                })
                                                .ToList();

            

            var document = Document
                .Create(d =>
                {
                    d.Page(p =>
                    {
                        p.Margin(1, QuestPDF.Infrastructure.Unit.Inch);

                        
                        p.Header().Column(column =>
                        {
                            column.Item().Row(row =>
                            {
                                row.Spacing(50);

                                row.RelativeItem().PaddingTop(-10).Text("Daftech Weekly Task Report").Style(Typography.Title);
                                row.ConstantItem(90).MaxHeight(30).Component<ImagePlaceholder>();
                            });

                            column.Item().PaddingVertical(15).Border(1f).BorderColor(Colors.Blue.Lighten1).ExtendHorizontal();

                           
                           
                        });

                        p.Content().Column(c =>
                        {
                            c.Item().Grid(grid =>
                            {
                                grid.Columns(2);
                                grid.Spacing(5);
                                grid.Item(2).Text(text =>
                                {
                                    text.Span("Tasks Ended this week ").Bold().Style(Typography.Headline);

                                });
                                grid.Item(2).PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);

                                foreach (var field in finishedTaskCountByEmployee)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span($"{field.EmployeeName}: ").SemiBold();
                                        text.Span(field.TaskCount.ToString());
                                    });
                                }
                                if(finishedTaskCountByEmployee.Count() == 0)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span("No Data Avaialble ").SemiBold();
                                        
                                    });

                                }
                                grid.Columns(2);
                                grid.Spacing(5);
                                grid.Item(2).Text(text =>
                                {
                                    text.Span("Tasks Started this week ").Bold().Style(Typography.Headline);

                                });
                                grid.Item(2).PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);

                                foreach (var field in startedTaskCountByEmployee)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span($"{field.EmployeeName}: ").SemiBold();
                                        text.Span(field.TaskCount.ToString());
                                    });
                                }
                                if (startedTaskCountByEmployee.Count() == 0)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span("No Data Avaialble ").SemiBold();

                                    });

                                }

                                grid.Columns(2);
                                grid.Spacing(5);
                                grid.Item(2).Text(text =>
                                {
                                    text.Span("Tasks Completed this week ").Bold().Style(Typography.Headline);

                                });
                                grid.Item(2).PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);

                                foreach (var field in completedTaskCountByEmployee)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span($"{field.EmployeeName}: ").SemiBold();
                                        text.Span(field.CompletedTaskCount.ToString());
                                    });
                                }
                                if (completedTaskCountByEmployee.Count() == 0)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span("No Data Avaialble ").SemiBold();

                                    });

                                }

                                grid.Columns(2);
                                grid.Spacing(5);
                                grid.Item(2).Text(text =>
                                {
                                    text.Span("Tasks In Progess this week ").Bold().Style(Typography.Headline);

                                });
                                grid.Item(2).PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);
                                foreach (var field in inprogressTaskCountByEmployee)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span($"{field.EmployeeName}: ").SemiBold();
                                        text.Span(field.InprogressTaskCount.ToString());
                                    });
                                }
                                if (inprogressTaskCountByEmployee.Count() == 0)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span("No Data Avaialble ").SemiBold();

                                    });

                                }
                                grid.Columns(2);
                                grid.Spacing(5);
                                grid.Item(2).Text(text =>
                                {
                                    text.Span("Tasks Not Started this week ").Bold().Style(Typography.Headline);

                                });
                                grid.Item(2).PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);
                                foreach (var field in notstartedTaskCountByEmployee)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span($"{field.EmployeeName}: ").SemiBold();
                                        text.Span(field.NotstartedTaskCount.ToString());
                                    });
                                }
                                if (notstartedTaskCountByEmployee.Count() == 0)
                                {
                                    grid.Item().Text(text =>
                                    {
                                        text.Span("No Data Avaialble ").SemiBold();

                                    });

                                }

                            });

                            c.Item().PageBreak();

                            c.Item().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn(3);
                                    columns.RelativeColumn(3);
                                    columns.RelativeColumn(3);
                                    columns.RelativeColumn(3);
                                });


                                foreach (var employeeTasks in finishedTasksForWeekList2)
                                {

                                    table.Cell().ColumnSpan(4).LabelCell(employeeTasks.Key);
                                    table.Cell().LabelCell("Task-Name");
                                    table.Cell().LabelCell("Task-Description");
                                    table.Cell().LabelCell("Task-Status");
                                    table.Cell().LabelCell("Task-End Date");
                                    foreach (var task in employeeTasks)
                                    {
                                        table.Cell().ValueCell().Text(task.TaskName).Style(Typography.Normal);
                                        table.Cell().ValueCell().Text(task.TaskDescription).Style(Typography.Normal);
                                        table.Cell().ValueCell().Text(task.TaskStatuses).Style(Typography.Normal);
                                        table.Cell().ValueCell().Text(task.EndDate).Style(Typography.Normal);
                                    }
                                }
                            });
                        });


                        p.Footer().AlignCenter().Text(text =>
                        {
                            text.CurrentPageNumber();
                            text.Span(" / ");
                            text.TotalPages();
                        });
                    });
                });




            var memoryStream = new MemoryStream();
            document.GeneratePdf(memoryStream);
            memoryStream.Position = 0;

            // Create an IFormFile instance from the MemoryStream
            var formFile = new FormFile(memoryStream, 0, memoryStream.Length, "myFileName.pdf", "myFileName.pdf");

            var path = _generalConfig.UploadFiles(formFile, $"WEEKLY-REPORT-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}", "WeeklyReport").Result.ToString();

            

 
        }
        
    }
}
