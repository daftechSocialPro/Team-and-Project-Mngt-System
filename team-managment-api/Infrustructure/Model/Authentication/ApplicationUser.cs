using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public Guid EmployeeId { get; set; }
        public RowStatus RowStatus { get; set; }
     
    }
}
