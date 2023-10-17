using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Complaint;
using IntegratedImplementation.Interfaces.Complaint;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Migrations;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Client;
using IntegratedInfrustructure.Model.Complaint;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        public ComplaintService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<ComplaintGetDto>> GetComplaints()
        {
            var complaints = await _dbContext.Complaints.Include(u => u.Project).Include(x=>x.Client).AsNoTracking()
                .ProjectTo<ComplaintGetDto>(_mapper.ConfigurationProvider).ToListAsync();
            
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
                    var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addComplaint.Subject}";
                    path = _generalConfig.UploadFiles(file, name, $"Files/Clients/Complaints/{addComplaint.Subject}").Result.ToString();
                    ComplaintFile complaintFile = new ComplaintFile
                    {
                        ComplaintId = id,
                        ComplaintCode= code,
                        FileName = fileName,
                        FilePath = path,
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
                        var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editComplaint.Subject}";
                        path = _generalConfig.UploadFiles(file, name, $"Files/Clients/Complaints/{editComplaint.Subject}").Result.ToString();
                        ComplaintFile complaintFile = new ComplaintFile
                        {
                            ComplaintId = complaint.Id,
                            ComplaintCode = complaint.ComplaintCode,
                            FileName = fileName,
                            FilePath = path,
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

        public async Task<ResponseMessage> AssignTask(ComplaintGetDto complain, Guid id )
        {







            return new ResponseMessage
            {
                Message = "Complaint Assigned Successfully",
                Success = true
            };
        }

    }
}
