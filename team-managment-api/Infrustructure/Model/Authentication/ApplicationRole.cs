using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Authentication
{
    public class RoleCategory
    {
        [Key]
        public int Id { get; set; }
        public string CategoryName { get; set; } = null!;
    }

    public class ApplicationRole : IdentityRole
    {
        public int RoleCategoryId { get; set; }
        public virtual RoleCategory RoleCategory { get; set; } = null!;
    }
}
