using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Complaint;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Client;
using IntegratedImplementation.Interfaces.Complaint;
using IntegratedImplementation.Services.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Complaint
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintController : ControllerBase
    {
        IComplaintService _complaintService;
        public ComplaintController(IComplaintService complaintService)
        {

            _complaintService = complaintService;
        }
        [HttpGet]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetComplaints()
        {
            return Ok(await _complaintService.GetComplaints());
        }
        [HttpGet("GetComplaint")]
        [ProducesResponseType(typeof(TeamGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetComplaint(Guid id)
        {
            return Ok(await _complaintService.GetComplaint(id));
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddComplaint([FromForm]ComplaintPostDto addComplaint)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _complaintService.AddComplaint(addComplaint));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateComplaint([FromForm] ComplaintPostDto complaint)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _complaintService.EditComplaint(complaint));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteComplaint(Guid complaintId)
        {
            return Ok(await _complaintService.DeleteComplaint(complaintId));
        }

        [HttpPost("AssignComplaint")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AssignAsTask(AssignComplaintDto complain)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _complaintService.AssignAsTask(complain));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
