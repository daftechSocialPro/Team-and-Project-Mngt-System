using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public class EducationalFieldDto
    {
        public string EducationalFieldName { get; set; } = null!;
        public string? Remark { get; set; }

        public string CreatedById { get; set; } = null!;
    }
}
