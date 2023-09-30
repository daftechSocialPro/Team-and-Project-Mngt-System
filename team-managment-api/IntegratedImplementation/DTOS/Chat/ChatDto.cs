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
    }
    public class ChatPostDto
    {
        public Guid EmployeeId { get; set; }
        public Guid ProjectId { get; set; }
        public string Message { get; set; }
        public string CreatedById { get; set; }
    }
}
