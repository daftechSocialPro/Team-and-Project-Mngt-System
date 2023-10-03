using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Notice;
using IntegratedImplementation.Helper.ChatHub;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Notice;
using IntegratedImplementation.Interfaces.Project;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Notice;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;


namespace IntegratedImplementation.Services.Notice
{
    public class NoticeService : INoticeService
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;
        private IHubContext<ChatHub, IChatHubInterface> _chatService;
        private readonly IProjectService _projectService;
        public NoticeService(
            ApplicationDbContext dbContext, 
            IMapper mapper, 
            IEmployeeService employeeService,
            IProjectService projectService,
            IHubContext<ChatHub, IChatHubInterface> chatHubInterface)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _employeeService = employeeService;
            _projectService = projectService;
            _chatService = chatHubInterface;

        }

        public async Task<ResponseMessage> PostNotice(NoticePostDto sendNotice)
        {
            NoticeList notice = new NoticeList
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                EmployeeId = sendNotice.EmployeeId,
                ProjectId = sendNotice.ProjectId,
                Subject = sendNotice.Subject,
                Content = sendNotice.Content,
                TeamId = sendNotice.TeamId,
                CreatedById = sendNotice.CreatedById


            };
            await _dbContext.Notices.AddAsync(notice);
            await _dbContext.SaveChangesAsync();

            var note = await GetNotice(notice.Id);

            foreach (var employee in sendNotice.EmployeeIds)
            {
                await _chatService.Clients.Group(employee).getNotice(note, employee);
            }


            return new ResponseMessage
            {
                Message = "Notice Send Successfully",
                Success = true
            };

        }

        public async Task<List<NoticeGetDto>> GetNotices()
        {
            var notices = await _dbContext.Notices.Include(c => c.Employee).OrderByDescending(x => x.CreatedDate).AsNoTracking()
                .ProjectTo<NoticeGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return notices;
        }
        public async Task<NoticeGetDto> GetNotice(Guid id)
        {
            var notice = await _dbContext.Notices.Include(c => c.Employee).Where(u => u.Id == id).AsNoTracking()
                .ProjectTo<NoticeGetDto>(_mapper.ConfigurationProvider).FirstAsync();

            return notice;
        }

    }
}
