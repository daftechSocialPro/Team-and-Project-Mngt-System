using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Project;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Chat
{
    public class ChatList : WithIdModel
    {
        public Guid EmployeeId { get; set; }

        public virtual EmployeeList Employee { get; set; }
        public Guid ProjectId { get; set; }
        public virtual ProjectList Project { get; set;}
        public string Message { get; set; }

    }
}
