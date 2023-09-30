using Implementation.Helper;
using IntegratedImplementation.DTOS.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Chat
{
    public interface IChatService
    {
        Task<ResponseMessage> SendMessage(ChatPostDto sendChat);
    }
}
