using IntegratedImplementation.DTOS.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Helper.ChatHub
{
    public interface IChatHubInterface
    {
        Task getNotification(List<ChatGetDto> notifications, string employeeId);
        Task AddDirectorToGroup(string employeeId);
    }
}
