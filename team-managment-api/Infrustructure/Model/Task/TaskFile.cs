using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Project;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Task
{
    public class TaskFile : WithIdModel
    {
        public virtual TaskList Task { get; set; }
        public Guid TaskId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
