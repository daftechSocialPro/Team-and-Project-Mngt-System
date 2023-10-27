using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Complaint;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.Interfaces.Complaint;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Task;
using IntegratedImplementation.Interfaces.Team;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Migrations;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Client;
using IntegratedInfrustructure.Model.Complaint;
using IntegratedInfrustructure.Model.Task;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Complaint
{
    public class ComplaintService : IComplaintService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ITaskService _taskService;
        private readonly ITeamService _teamService;
        public ComplaintService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IGeneralConfigService generalConfig, IMapper mapper, ITaskService taskService, ITeamService teamService)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
            _taskService = taskService; 
            _teamService = teamService; 
        }

        public async Task<List<ComplaintGetDto>> GetComplaints()
        {
            var complaints = await _dbContext.Complaints.Include(u => u.Project).Include(x=>x.Client).AsNoTracking()
                .ProjectTo<ComplaintGetDto>(_mapper.ConfigurationProvider).ToListAsync();
            
            return complaints;
        }
        public async Task<ComplaintGetDto> GetComplaint(Guid id)
        {
            var complaints = await _dbContext.Complaints.Where(y => y.Id == id).Include(u => u.Project).Include(x => x.Client).AsNoTracking()
                .ProjectTo<ComplaintGetDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();

            return complaints;
        }


        public async Task<ResponseMessage> AddComplaint(ComplaintPostDto addComplaint)
        {
            var id = Guid.NewGuid();
            var path = "";
            var code = await _generalConfig.GenerateCode(GeneralCodeType.COMPLAINTPREFIX);
            ComplaintList complaint = new ComplaintList
            {
                Id= id,
                Subject = addComplaint.Subject,
                Description = addComplaint.Description,
                ComplaintCode = code,
                ClientId = addComplaint.ClientId,
                ProjectId = addComplaint.ProjectId,
                ComplaintType = Enum.Parse<ComplaintType>(addComplaint.ComplaintType),
                ComplaintStatus = ComplaintStatus.PENDING,
                CreatedById = addComplaint.CreatedById,
                CreatedDate = DateTime.Now,
            };
            await _dbContext.Complaints.AddAsync(complaint);
            await _dbContext.SaveChangesAsync();
            if (addComplaint.ComplaintFiles != null && addComplaint.ComplaintFiles.Count > 0)
            {
                foreach (var file in addComplaint.ComplaintFiles.Distinct())
                {
                    var fileName = file.FileName;
                    var fileType = file.ContentType;
                    var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addComplaint.Subject}";
                    path = _generalConfig.UploadFiles(file, name, $"Files/Clients/Complaints/{addComplaint.Subject}").Result.ToString();
                    ComplaintFile complaintFile = new ComplaintFile
                    {
                        ComplaintId = id,
                        ComplaintCode= code,
                        FileName = fileName,
                        FilePath = path,
                        FileType = fileType,
                        CreatedById = addComplaint.CreatedById
                    };
                    await _dbContext.ComplaintFiles.AddAsync(complaintFile);
                }
                await _dbContext.SaveChangesAsync();


            }

            return new ResponseMessage
            {

                Message = "Complaints Added Successfully",
                Success = true
            };

        }

        public async Task<ResponseMessage> EditComplaint(ComplaintPostDto editComplaint)
        {
            var complaint = _dbContext.Complaints.Find(editComplaint.Id);

            if(complaint != null) 
            {
                complaint.Subject = editComplaint.Subject;
                complaint.Description= editComplaint.Description;
                complaint.ComplaintStatus = Enum.Parse<ComplaintStatus>(editComplaint.ComplaintStatus);

                await _dbContext.SaveChangesAsync();
                
                if (editComplaint.ComplaintFiles != null && editComplaint.ComplaintFiles.Count > 0)
                {
                    var path = "";
                    foreach (var file in editComplaint.ComplaintFiles.Distinct())
                    {
                        var fileName = file.FileName;
                        var fileType = file.ContentType;
                        var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editComplaint.Subject}";
                        path = _generalConfig.UploadFiles(file, name, $"Files/Clients/Complaints/{editComplaint.Subject}").Result.ToString();
                        ComplaintFile complaintFile = new ComplaintFile
                        {
                            ComplaintId = complaint.Id,
                            ComplaintCode = complaint.ComplaintCode,
                            FileName = fileName,
                            FilePath = path,
                            FileType = fileType,
                            CreatedById = editComplaint.CreatedById
                        };
                        await _dbContext.ComplaintFiles.AddAsync(complaintFile);
                    }
                    await _dbContext.SaveChangesAsync();

                }

                return new ResponseMessage
                {
                    Message = "Complaints Updated Successfully",
                    Success = true
                };

            }
            else
            {
                return new ResponseMessage
                {
                    Message = "Complaint Not Found",
                    Success = false
                };
            }
        }

        public async Task<ResponseMessage> AssignAsTask(AssignComplaintDto complain)
        {
            if (complain.EmployeeId != null && complain.EmployeeId.Count> 0)
            {
                foreach (var emp in complain.EmployeeId)
                {
                    if(complain.Complaint.AssignedEmployees.Any(x => x.Id == emp))
                    {
                        continue;
                    }
                    TaskPostDto complainTask = new TaskPostDto
                    {
                        TaskName = complain.Complaint.Subject,
                        EndDate = complain.EndDate,
                        TaskStatuses = "NOTSTARTED",
                        TaskPriority = complain.TaskPriority,
                        EmployeeId = emp,
                        ProjectId = complain.Complaint.ProjectId,
                        TaskDescription = complain.Complaint.Description,
                        CreatedById = complain.CreatedById,
                        ProjectName = complain.Complaint.Project.ProjectName,
                        //TaskFiles = complain.Complaint.ComplaintFiles

                    };
                    var result = await _taskService.AddTask(complainTask);
                    if (result.Success)
                    {
                        foreach (var file in complain.Complaint.ComplaintFiles.Distinct())
                        {
                            
                            TaskFile taskFile = new TaskFile
                            {
                                TaskId = (Guid)result.Data,
                                FileName = file.FileName,
                                FilePath = file.FilePath,
                                FileType = file.FileType,
                                CreatedById = complain.CreatedById
                            };
                            await _dbContext.TaskFiles.AddAsync(taskFile);
                        }
                        await _dbContext.SaveChangesAsync();

                    }
                }

                var complaint = _dbContext.Complaints.Find(complain.Complaint.Id);
                var employees = _dbContext.Employees.Where(e => complain.EmployeeId.Contains(e.Id)).ToList();

                complaint.AssignedEmployees = employees;
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Message = "Complaint Assigned Successfully",
                    Success = true
                };
            }
            else
            {
                return new ResponseMessage
                {
                    Message = "Complaint Assign Failed",
                    Success = false
                };
            }
           


            
        }

    }
}
