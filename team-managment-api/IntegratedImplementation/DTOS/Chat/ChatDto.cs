using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Chat
{
    public class ChatGetDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid ProjectId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public SelectListDto Employee { get; set; }
    }
    public class ChatPostDto
    {
        public Guid EmployeeId { get; set; }
        public Guid ProjectId { get; set; }
        public string Message { get; set; }
        public string CreatedById { get; set; }
        public List<string> EmployeeIds { get; set;}

    }
}
