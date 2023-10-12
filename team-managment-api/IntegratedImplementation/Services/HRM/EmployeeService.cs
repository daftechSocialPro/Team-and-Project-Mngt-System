using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployeeService : IEmployeeService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public EmployeeService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager, 
            IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee)
        {
            var id = Guid.NewGuid();
            var path = "";

            if (addEmployee.ImagePath != null)
                path = _generalConfig.UploadFiles(addEmployee.ImagePath, id.ToString(), "Employee").Result.ToString();


            var probationPeriod = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.PROBATIONPERIOD);
            if (probationPeriod == null)
                return new ResponseMessage { Success = false, Message = "Could Not Find Prohbation Period" };


            var code = await _generalConfig.GenerateCode(GeneralCodeType.EMPLOYEEPREFIX);
            addEmployee.EmploymentStatus = EmploymentStatus.ACTIVE.ToString();
            EmployeeList employee = new EmployeeList
            {
                Id = id,
                CreatedDate = DateTime.Now,
               CreatedById = addEmployee.CreatedById,
                EmployeeCode = code,

                Email = addEmployee.Email,

                EmploymentStatus = Enum.Parse<EmploymentStatus>(addEmployee.EmploymentStatus),
                EmploymentPosition = Enum.Parse<EmploymentPosition>(addEmployee.EmploymentPosition),

                FirstName = addEmployee.FirstName,
                Address = addEmployee.Address,
                LastName = addEmployee.LastName,
                BirthDate = addEmployee.BirthDate,
                Gender = Enum.Parse<Gender>(addEmployee.Gender),

                BankAccountNo = addEmployee.BankAccountNo,
                EmploymentDate = addEmployee.EmploymentDate,
                ImagePath = path,
                PhoneNumber = addEmployee.PhoneNumber,

                TinNumber = addEmployee.TinNumber,
                Twitter = addEmployee.Twitter,
                Facebook = addEmployee.Facebook,
                Instagram = addEmployee.Instagram,
                Telegram = addEmployee.Telegram,

                Rowstatus = RowStatus.ACTIVE,

            };
            await _dbContext.Employees.AddAsync(employee);
            await _dbContext.SaveChangesAsync();



            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> UpdateEmployee(EmployeeGetDto addEmployee)
        {

            var path = "";

            if (addEmployee.Image != null)
                path = _generalConfig.UploadFiles(addEmployee.Image, addEmployee.Id.ToString(), "Employee").Result.ToString();


            var probationPeriod = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.PROBATIONPERIOD);
            if (probationPeriod == null)
                return new ResponseMessage { Success = false, Message = "Could Not Find Prohbation Period" };



            addEmployee.EmploymentStatus = EmploymentStatus.ACTIVE.ToString();

            var employee = _dbContext.Employees.Find(addEmployee.Id);

            if (employee != null)
            {

                employee.Email = addEmployee.Email;
                employee.EmploymentStatus = Enum.Parse<EmploymentStatus>(addEmployee.EmploymentStatus);
                employee.EmploymentPosition = Enum.Parse<EmploymentPosition>(addEmployee.EmploymentPosition);

                employee.FirstName = addEmployee.FirstName;
                employee.Address = addEmployee.Address;
                employee.LastName = addEmployee.LastName;
                employee.BirthDate = addEmployee.BirthDate;
                employee.Gender = Enum.Parse<Gender>(addEmployee.Gender);

                employee.BankAccountNo = addEmployee.BankAccountNo;
                employee.EmploymentDate = addEmployee.EmploymentDate;
                

                if (addEmployee.Image!=null)
                {
                    employee.ImagePath = path;
                }
                employee.PhoneNumber = addEmployee.PhoneNumber;

                employee.TinNumber = addEmployee.TinNumber;
                employee.Twitter = addEmployee.Twitter;
                employee.Facebook = addEmployee.Facebook;
                employee.Instagram = addEmployee.Instagram;
                employee.Telegram = addEmployee.Telegram;

                employee.Rowstatus = RowStatus.ACTIVE;

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {

                    Message = "Updated Successfully",
                    Success = true
                };

            }
            else
            {
                return new ResponseMessage
                {

                    Message = "No employee Found",
                    Success = false
                };
            }
   



        }

        public async Task<List<EmployeeGetDto>> GetEmployees()
        {
            var employeeList = await _dbContext.Employees.AsNoTracking()
                                    .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return employeeList;
        }

        public async Task<EmployeeGetDto> GetEmployee(Guid employeeId)
        {
            var employee = await _dbContext.Employees

                .Where(x => x.Id == employeeId)
                .AsNoTracking()
                .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider).FirstAsync();

            return employee;
        }



        public async Task<List<SelectListDto>> GetEmployeeNoUser()
        {
            var users = _userManager.Users.Select(x => x.EmployeeId).ToList();
                
            var employees = await _dbContext.Employees
                .Where(e => !users.Contains(e.Id))
                .ProjectTo<SelectListDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return employees;
        }
        

      public async  Task<List<SelectListDto>> GetEmployeeSelectList()
        {

            var employees = await _dbContext.Employees.ProjectTo<SelectListDto>(_mapper.ConfigurationProvider).ToListAsync();
            
            return employees;
        }

        public async Task<ResponseMessage> changeEmployeeImage(EmployeeImagePostDto addEmployee)
        {

            var path = "";

            if (addEmployee.Image != null)
                path = _generalConfig.UploadFiles(addEmployee.Image, addEmployee.Id.ToString(), "Employee").Result.ToString();
            var employee = _dbContext.Employees.Find(addEmployee.Id);
            if (employee != null)
            {
                if (addEmployee.Image != null)
                {
                    employee.ImagePath = path;
                }

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {

                    Message = "Image Updated Successfully",
                    Success = true
                };

            }
            else
            {
                return new ResponseMessage
                {

                    Message = "No employee Found",
                    Success = false
                };
            }

        }
    }
}
