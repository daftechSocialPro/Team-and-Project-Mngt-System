using Implementation.Helper;
using IntegratedImplementation.DTOS.Complaint;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Complaint
{
    public interface IComplaintService
    {
        Task<List<ComplaintGetDto>> GetComplaints();
        Task<ResponseMessage> AddComplaint(ComplaintPostDto addComplaint);
        Task<ResponseMessage> EditComplaint(ComplaintPostDto editComplaint);
    }
}
