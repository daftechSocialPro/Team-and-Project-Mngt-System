using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Notice
{
    public class NoticeGetDto
    {
        public Guid Id { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? TeamId { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime CreatedDate { get; set; }
        public SelectListDto Employee { get; set; }

    }
    public class NoticePostDto
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? TeamId { get; set; }
        public Guid EmployeeId { get; set; }
        public List<string> EmployeeIds { get; set; }

    }

}
