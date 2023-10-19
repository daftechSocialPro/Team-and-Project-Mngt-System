using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Configuration;
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
        Task<ClientGetDto> GetClient(Guid id);
        Task<ResponseMessage> AddClient(ClientPostDto addClient);
        Task<ResponseMessage> EditClient(ClientPostDto editClient);
        Task<ResponseMessage> AddContactToClient(List<AddToClientDto> addToClient);
        Task<List<SelectListDto>> GetClientNoUser();

    }
}
