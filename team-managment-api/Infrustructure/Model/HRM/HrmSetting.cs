using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class HrmSetting :WithIdModel
    {
        public GeneralHrmSetting GeneralSetting { get; set; }
        public double Value { get; set; }

    }
}
