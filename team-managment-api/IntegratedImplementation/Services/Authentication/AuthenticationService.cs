using Implementation.DTOS.Authentication;

using Implementation.Helper;
using Implementation.Interfaces.Authentication;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using static IntegratedInfrustructure.Data.EnumList;

namespace Implementation.Services.Authentication
{

    public class AuthenticationService : IAuthenticationService
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _dbContext;
      
        public AuthenticationService(UserManager<ApplicationUser> userManager,
            
            ApplicationDbContext dbContext,
         
              RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
     
        }


        public async Task<ResponseMessage> Login(LoginDto login)
        {
            var user = await _userManager.FindByNameAsync(login.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                if (user.RowStatus == RowStatus.INACTIVE)
                    return new ResponseMessage()
                    {
                        Success = false,
                        Message = "Error!! please contact Your Admin"
                    };
                var roleList = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var str = String.Join(",", roleList);
                var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == user.EmployeeId);
                if (employee != null)
                {

                    var TokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                        {
                        new Claim("userId", user.Id.ToString()),
                        new Claim("employeeId", user.EmployeeId.ToString()),
                        new Claim("fullName", $"{employee.FirstName}  {employee.LastName}"),
                        new Claim("photo",employee?.ImagePath),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, str),

                        }),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1225290901686999272364748849994004994049404940")), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var TokenHandler = new JwtSecurityTokenHandler();
                    var SecurityToken = TokenHandler.CreateToken(TokenDescriptor);
                    var token = TokenHandler.WriteToken(SecurityToken);
                    return new ResponseMessage()
                    {
                        Success = true,
                        Message = "Login Success",
                        Data = token
                    };
                }

                return new ResponseMessage()
                {
                    Success = false,
                    Message = "could not find Employee"
                };
            }
            else
                return new ResponseMessage()
                {
                    Success = false,
                    Message = "Invalid User Name or Password"
                };

        }

        public async Task<List<UserListDto>> GetUserList()
        {
            var userList = await _userManager.Users.ToListAsync();
            var userLists = new List<UserListDto>();

            foreach (var user in userList)
            {

                var employee = _dbContext.Employees.Find(user.EmployeeId);

                var userListt = new UserListDto()
                {
                    Id = user.Id,
                    EmployeeId = user.EmployeeId,
                    UserName = user.UserName,
                    Name = $"{employee.FirstName} {employee.LastName}",
                    Status = user.RowStatus.ToString(),
                    ImagePath = employee.ImagePath,
                    Email = employee.Email,


                };
                userListt.Roles = await GetAssignedRoles(user.Id, 1);

                userLists.Add(userListt);

            }



            return userLists;
        }

        public async Task<ResponseMessage> AddUser(AddUSerDto addUSer)
        {
            var currentEmployee = _userManager.Users.Any(x => x.EmployeeId.Equals(addUSer.EmployeeId));
            if (currentEmployee)
                return new ResponseMessage { Success = false, Message = "Employee Already Exists" };

            var applicationUser = new ApplicationUser
            {
                EmployeeId = addUSer.EmployeeId,
                Email = addUSer.UserName + "@her.com",
                UserName = addUSer.UserName,
                RowStatus = RowStatus.ACTIVE,
            };

            var response = await _userManager.CreateAsync(applicationUser, addUSer.Password);

            if (response.Succeeded)
            {
                var currentEmployee1 = _userManager.Users.Where(x => x.EmployeeId.Equals(addUSer.EmployeeId)).FirstOrDefault();



                if ((!addUSer.Roles.IsNullOrEmpty()) && currentEmployee1 != null)
                {
                    var userRoles = new UserRoleDto();
                    userRoles.UserId = currentEmployee1.Id;
                    userRoles.RoleName = addUSer.Roles ;

                    await _userManager.AddToRoleAsync(currentEmployee1, userRoles.RoleName);
                }
                return new ResponseMessage { Success = true, Message = "Succesfully Added User", Data = applicationUser.UserName };
            }
            else
            {

                string errorMessage = string.Join(", ", response.Errors.Select(error => error.Code));
                return new ResponseMessage { Success = false, Message = errorMessage, Data = applicationUser.UserName };
            }


        }

        public async Task<List<RoleDropDown>> GetRoleCategory()
        {
            var roleCategory = await _roleManager.Roles.Select(x => new RoleDropDown
            {
                Id = x.Id.ToString(),
                Name = x.NormalizedName,
            }).ToListAsync();

            return roleCategory;
        }
        public async Task<List<RoleDropDown>> GetNotAssignedRole(string userId, int categoryId)
        {
            var currentuser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
            if (currentuser != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(currentuser);
                if (currentRoles.Any())
                {
                    var notAssignedRoles = await _roleManager.Roles.
                                  Where(x => 
                                  !currentRoles.Contains(x.Name)).Select(x => new RoleDropDown
                                  {
                                      Id = x.Id,
                                      Name = x.Name
                                  }).ToListAsync();

                    return notAssignedRoles;
                }
                else
                {
                    var notAssignedRoles = await _roleManager.Roles
                                .Select(x => new RoleDropDown
                                  {
                                      Id = x.Id,
                                      Name = x.Name
                                  }).ToListAsync();

                    return notAssignedRoles;

                }


            }

            throw new FileNotFoundException();
        }

        public async Task<List<RoleDropDown>> GetAssignedRoles(string userId, int categoryId)
        {
            var currentuser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
            if (currentuser != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(currentuser);
                if (currentRoles.Any())
                {
                    var notAssignedRoles = await _roleManager.Roles.
                                      Where(x => 
                                      currentRoles.Contains(x.Name)).Select(x => new RoleDropDown
                                      {
                                          Id = x.Id,
                                          Name = x.Name
                                      }).ToListAsync();

                    return notAssignedRoles;
                }

                return new List<RoleDropDown>();

            }

            throw new FileNotFoundException();
        }

        public async Task<ResponseMessage> AssignRole(UserRoleDto userRole)
        {
            var currentUser = await _userManager.Users.FirstOrDefaultAsync(x=>x.Id==userRole.UserId);

            if (currentUser != null)
            {
                var roleExists = await _roleManager.RoleExistsAsync(userRole.RoleName);

                if (roleExists)
                {
                    await _userManager.AddToRoleAsync(currentUser, userRole.RoleName);
                    return new ResponseMessage { Success = true, Message = "Successfully Added Role" };
                }
                else
                {
                    return new ResponseMessage { Success = false, Message = "Role does not exist" };
                }
            }
            else
            {
                return new ResponseMessage { Success = false, Message = "User Not Found" };
            }
        }


        public async Task<ResponseMessage> RevokeRole(UserRoleDto userRole)
        {
            var curentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userRole.UserId));

            if (curentUser != null)
            {
                await _userManager.RemoveFromRoleAsync(curentUser, userRole.RoleName);
                return new ResponseMessage { Success = true, Message = "Succesfully Revoked Roles" };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };

        }

        public async Task<ResponseMessage> ChangeStatusOfUser(string userId)
        {
            var curentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));

            if (curentUser != null)
            {
                curentUser.RowStatus = curentUser.RowStatus == RowStatus.ACTIVE ? RowStatus.INACTIVE : RowStatus.ACTIVE;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Succesfully Changed Status of User", Data = curentUser.Id };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };
        }

        public async Task<ResponseMessage> ChangePassword(ChangePasswordDto model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
            {
                return new ResponseMessage
                {

                    Success = false,
                    Message = "User not found."
                };
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = result.Errors.ToString()
                };
            }

            return new ResponseMessage { Message = "Password changed successfully.", Success = true };
        }
    }
}
