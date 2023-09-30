using AutoMapper;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Project;
using IntegratedInfrustructure.Data;
using IntegratedImplementation.Interfaces.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using IntegratedImplementation.DTOS.Chat;
using Implementation.Helper;
using IntegratedInfrustructure.Model.Chat;

namespace IntegratedImplementation.Services.Chat
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;
        private readonly IProjectService _projectService;
        public ChatService(ApplicationDbContext dbContext, IMapper mapper, IEmployeeService employeeService, IProjectService projectService) { 
            _dbContext = dbContext;
            _mapper = mapper;
            _employeeService = employeeService;
            _projectService = projectService;
                    
        }
        
        public async Task<ResponseMessage> SendMessage(ChatPostDto sendChat)
        {
            ChatList chat = new ChatList
            {
                Id = Guid.NewGuid(),
                EmployeeId= sendChat.EmployeeId,
                ProjectId= sendChat.ProjectId,
                Message= sendChat.Message,
                CreatedById =sendChat.CreatedById

            };
            await _dbContext.Chats.AddAsync(chat);
            await _dbContext.SaveChangesAsync();


            return new ResponseMessage
            {

                Message = "Chat Added Successfully",
                Success = true
            };

        }
        

    }
}
