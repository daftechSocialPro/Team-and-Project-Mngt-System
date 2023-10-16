using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Client;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Client;
using IntegratedInfrustructure.Model.Project;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

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

            
            if (addClient.Image != null)
                path = _generalConfig.UploadFiles(addClient.Image, id.ToString(), "Client").Result.ToString();
            ClientList client = new ClientList
            {
                Id = id,
                Name = addClient.Name,
                Address = addClient.Address,
                Description = addClient.Description,
                CreatedById = addClient.CreatedById,
                CreatedDate = DateTime.Now,
                Email = addClient.Email,
                PhoneNo= addClient.PhoneNo,
                ImagePath = path

             };
            await _dbContext.Clients.AddAsync(client);
            await _dbContext.SaveChangesAsync();
            foreach (var contact in addClient.ClientContacts)
            {
                AddContactToClient(contact, id);

            }
            if (addClient.ClientFiles != null && addClient.ClientFiles.Count > 0)
            {
                foreach (var file in addClient.ClientFiles.Distinct())
                {
                    var fileName = file.FileName;
                    var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{addClient.Name}";
                    path = _generalConfig.UploadFiles(file, name, $"Files/Clients/{addClient.Name}").Result.ToString();
                    ClientFile clientFile = new ClientFile
                    {
                        ClientId = id,
                        FileName = fileName,
                        FilePath = path,
                        CreatedById = addClient.CreatedById
                    };
                    await _dbContext.ClientFiles.AddAsync(clientFile);
                }
                await _dbContext.SaveChangesAsync();


            }

            return new ResponseMessage
            {

                Message = "Client Added Successfully",
                Success = true
            };

        }

        public async Task<ResponseMessage> EditClient(ClientPostDto editClient)
        {
            var path = "";

            if (editClient.Image != null)
                path = _generalConfig.UploadFiles(editClient.Image, editClient.Id.ToString(), "Client").Result.ToString();

            var client = _dbContext.Clients.Find(editClient.Id);

            if (client != null)
            {

                client.Email = editClient.Email;                
                client.Name = editClient.Name;
                client.Address = editClient.Address;
                client.Email = editClient.Email;
                client.PhoneNo = editClient.PhoneNo;
                client.Description = editClient.Description;
                
                if (editClient.Image != null)
                {
                    client.ImagePath = path;
                }                       
                              
                await _dbContext.SaveChangesAsync();

                if (editClient.ClientFiles != null && editClient.ClientFiles.Count > 0)
                {
                    foreach (var file in editClient.ClientFiles.Distinct())
                    {
                        var fileName = file.FileName;
                        var name = $"{Path.GetFileNameWithoutExtension(file.FileName)}-{DateTime.Now.ToString("yyyy-MM-dd HH.mm.ss")}-{editClient.Name}";
                        path = _generalConfig.UploadFiles(file, name, $"Files/Clients/{editClient.Name}").Result.ToString();
                        ClientFile clientFile = new ClientFile
                        {
                            ClientId = client.Id,
                            FileName = fileName,
                            FilePath = path,
                            CreatedById = editClient.CreatedById
                        };
                        await _dbContext.ClientFiles.AddAsync(clientFile);
                    }
                    await _dbContext.SaveChangesAsync();


                }



                return new ResponseMessage
                {

                    Message = "Client Updated Successfully",
                    Success = true
                };

            }
            else
            {
                return new ResponseMessage
                {

                    Message = "Client No Found",
                    Success = false
                };
            }

        }

        public async Task<ResponseMessage> AddContactToClient(AddToClientDto addToClient,Guid id)
        {
            
            ClientContact contact = new ClientContact
            {
                ClientId = id,
                Name = addToClient.Name,
                Position = addToClient.Position,
                PhoneNo = addToClient.PhoneNo,
                Email = addToClient.Email,
                CreatedById = addToClient.CreatedById
            };
            await _dbContext.ClientContacts.AddAsync(contact);
            await _dbContext.SaveChangesAsync();
            

            return new ResponseMessage
            {

                Message = "Clients Contacts Added Successfully",
                Success = true
            };
        }


    }
}
