using Implementation.Helper;
using IntegratedImplementation.DTOS.Chat;
using IntegratedImplementation.DTOS.Task;
using IntegratedImplementation.Interfaces.Chat;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Chat
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        IChatService _chatService;
        public ChatController(IChatService chatService) {
            _chatService= chatService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SendMessage(ChatPostDto sendChat)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _chatService.SendMessage(sendChat) );
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [ProducesResponseType(typeof(ChatGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTasks(Guid projectId)
        {
            return Ok(await _chatService.GetProjectMessages(projectId));
        }


    }
}
