using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Task;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Client
{
    public class ClientList : WithIdModel
    {
        public ClientList()
        {
            ClientFiles = new HashSet<ClientFile>();
        }

        [InverseProperty(nameof(ClientFile.Client))]
        public ICollection<ClientFile> ClientFiles { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string? ImagePath { get; set; } = null!;


    }
}
