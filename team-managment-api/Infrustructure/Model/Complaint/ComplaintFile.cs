using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Complaint
{
    public class ComplaintFile : WithIdModel
    {
        public virtual ComplaintList Complaint { get; set; }
        public Guid ComplaintId { get; set; }
        public string ComplaintCode { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }

    }
}
