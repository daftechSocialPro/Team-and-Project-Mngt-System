
using IntegratedImplementation.DTOS.Chat;
using Microsoft.AspNetCore.SignalR;

namespace IntegratedImplementation.Helper.ChatHub
{
    public class ChatHub : Hub<IChatHubInterface>
    {

        public override async Task OnConnectedAsync()
        {

            await base.OnConnectedAsync();
        }
        public async Task AddDirectorToGroup(string[] employeeIds)
        {
            foreach (var employee in employeeIds)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, employee);
            }
            //var directorUserId = employeeId; // Replace with the actual director's user ID

            // Add the director to the specified group
            

            // Call the client-side method 'getNotification' on all clients

        }

        public async Task getNotification(List<ChatGetDto> notifcations, string employeeId)
        {

            await Clients.Group(employeeId).getNotification(notifcations, employeeId);
        }

    }
}
