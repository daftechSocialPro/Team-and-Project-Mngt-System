using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public class CountryDto
    {
        public string CountryName { get; set; } = null!;
        public string CountryCode { get; set; } = null!;
        public string Nationality { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
    }

    public class RegionDto
    {
        public string RegionName { get; set; } = null!;
        public Guid CountryId { get; set; }
        public string CreatedById { get; set; } = null!;

    }

    public class ZoneDto
    {
        public string ZoneName { get; set; } = null!;
        public Guid RegionId { get; set; }
        public string CreatedById { get; set; } = null!;
    }
}
