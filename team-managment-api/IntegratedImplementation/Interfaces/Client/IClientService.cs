using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Client
{
    public interface IClientService
    {
        Task<List<ClientGetDto>> GetClients();
        Task<ResponseMessage> AddClient(ClientPostDto addClient);

    }
}
