
using IntegratedImplementation.DTOS.Chat;
using IntegratedImplementation.DTOS.Notice;
using Microsoft.AspNetCore.SignalR;

namespace IntegratedImplementation.Helper.ChatHub
{
    public class ChatHub : Hub<IChatHubInterface>
    {

        public override async Task OnConnectedAsync()
        {

            await base.OnConnectedAsync();
        }
        public async Task AddDirectorToGroup(string employeeId)
        {
            
            await Groups.AddToGroupAsync(Context.ConnectionId, employeeId);
                      

        }









    }
}
