using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Client;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Client;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.Client
{
    public class ClientService: IClientService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IGeneralConfigService _generalConfig;
        public ClientService(ApplicationDbContext dbContext, IMapper mapper, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _generalConfig= generalConfig;
            _mapper = mapper;
        }

        public async Task<List<ClientGetDto>> GetClients()
        {
            var clientList = await _dbContext.Clients.AsNoTracking()
                                    .ProjectTo<ClientGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return clientList;
        }

        public async Task<ResponseMessage> AddClient(ClientPostDto addClient)
        {

            var id = Guid.NewGuid();
            var path = "";

            if (addClient.ClientFiles.Count > 0)
            {
                foreach(var file in addClient.ClientFiles)
                {
                    var fileName = file.FileName;
                    var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addClient.Name}";
                    path = _generalConfig.UploadFiles(file, name, $"Files/Clients/{addClient.Name}").Result.ToString();
                    ClientFile clientFile = new ClientFile
                    {
                        ClientId= id,
                        FileName= fileName,
                        FilePath = path,
                        
                    };
                    await _dbContext.ClientFiles.AddAsync(clientFile);
                }
                await _dbContext.SaveChangesAsync();


            }
            if (addClient.ImagePath != null)
                path = _generalConfig.UploadFiles(addClient.ImagePath, id.ToString(), "Employee").Result.ToString();
            ClientList client = new ClientList
            {
                Id = id,
                Name = addClient.Name,
                Address = addClient.Address,
                Description = addClient.Description,
                CreatedById = addClient.CreatedById,
                CreatedDate = DateTime.Now,
                Email = addClient.Email,
                ImagePath = path

             };
            await _dbContext.Clients.AddAsync(client);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Client Added Successfully",
                Success = true
            };

        }


    }
}
