using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Complaint;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Project
{
    public class ProjectFile : WithIdModel
    {
        public virtual ProjectList Project { get; set; }
        public Guid ProjectId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
    }
}
