using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeList : WithIdModel
    {

      
        public string EmployeeCode { get; set; } = null!;
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;

        public string? ImagePath { get; set; } = null!;
        public string Address { get; set; } = null!;

        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
     
        public DateTime EmploymentDate { get; set; }
  
        public DateTime? TerminatedDate { get; set; }
  
        public EmploymentStatus EmploymentStatus { get; set; }

        public EmploymentPosition EmploymentPosition { get; set; } 

        public string? TinNumber { get; set; } = null!;
        public string? BankAccountNo { get; set; } = null!;


  }

    
}
