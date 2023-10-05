using IntegratedImplementation.DTOS.Chat;
using IntegratedImplementation.DTOS.Notice;
using IntegratedImplementation.DTOS.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Helper.ChatHub
{
    public interface IChatHubInterface
    {
        Task getNotification(ChatGetDto notifications, string employeeId);
        Task AddDirectorToGroup(string employeeId);
        Task getNotice(NoticeGetDto notice, string employeeId);
        Task getTaskNotice(TaskGetDto task ,string employeeId);

    }
}
