using AutoMapper;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Project;
using IntegratedInfrustructure.Data;
using IntegratedImplementation.Interfaces.Chat;
using IntegratedImplementation.DTOS.Chat;
using Implementation.Helper;
using IntegratedInfrustructure.Model.Chat;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using IntegratedImplementation.Helper.ChatHub;
using Microsoft.AspNetCore.SignalR;

namespace IntegratedImplementation.Services.Chat
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;
        private IHubContext<ChatHub,  IChatHubInterface> _chatService;
        private readonly IProjectService _projectService;
        public ChatService(ApplicationDbContext dbContext, IMapper mapper, IEmployeeService employeeService, IProjectService projectService, IHubContext<ChatHub, IChatHubInterface> chatHubInterface) { 
            _dbContext = dbContext;
            _mapper = mapper;
            _employeeService = employeeService;
            _projectService = projectService;
            _chatService = chatHubInterface;
                    
        }
        
        public async Task<ResponseMessage> SendMessage(ChatPostDto sendChat)
        {
            ChatList chat = new ChatList
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                EmployeeId = sendChat.EmployeeId,
                ProjectId = sendChat.ProjectId,
                Message = sendChat.Message,
                CreatedById = sendChat.CreatedById

            };
            await _dbContext.Chats.AddAsync(chat);
            await _dbContext.SaveChangesAsync();

            var msgs = await _dbContext.Chats.Include(c => c.Employee).Where(u => u.Id == chat.Id).OrderBy(x => x.CreatedDate).AsNoTracking()
                .ProjectTo<ChatGetDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();



               await _chatService.Clients.Group(sendChat.ProjectId.ToString()).getNotification(msgs, sendChat.ProjectId.ToString());
            



            return new ResponseMessage
            {

                Message = "Chat Added Successfully",
                Success = true
            };

        }

        public async Task<List<ChatGetDto>> GetProjectMessages(Guid projectId)
        {
            var msgs = await _dbContext.Chats.Include(c => c.Employee).Where(u => u.ProjectId == projectId).OrderBy(x => x.CreatedDate).AsNoTracking()
                .ProjectTo<ChatGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return msgs;
        }
        

    }
}
