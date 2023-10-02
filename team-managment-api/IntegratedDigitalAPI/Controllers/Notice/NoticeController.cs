using Implementation.Helper;
using IntegratedImplementation.DTOS.Chat;
using IntegratedImplementation.DTOS.Notice;
using IntegratedImplementation.Interfaces.Notice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Notice
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController : ControllerBase
    {
        INoticeService _noticeService;
        public NoticeController(INoticeService noticeService)
        {
            _noticeService = noticeService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> PostNotice(NoticePostDto postNotice)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _noticeService.PostNotice(postNotice));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [ProducesResponseType(typeof(ChatGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetNotices()
        {
            return Ok(await _noticeService.GetNotices());
        }
        [HttpGet("GetNotice")]
        [ProducesResponseType(typeof(ChatGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetNotice(Guid id)
        {
            return Ok(await _noticeService.GetNotice(id));
        }
    }
}
