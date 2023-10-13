using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Complaint
{
    public class ComplaintList : WithIdModel
    {
        public ComplaintList()
        {
            ComplaintFiles = new HashSet<ComplaintFile>();
        }

        [InverseProperty(nameof(ComplaintFile.Complaint))]
        public ICollection<ComplaintFile> ComplaintFiles { get; set; }
        public string ComplaintCode { get; set; }
        public string Description { get; set; }
        public string Subject { get; set; }
        public ComplaintType ComplaintType { get; set; }
        public ComplaintStatus ComplaintStatus { get; set; }


    }
}
