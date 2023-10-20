using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Client;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.DTOS.Team;
using IntegratedImplementation.Interfaces.Client;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Client;
using IntegratedInfrustructure.Model.Project;
using Microsoft.AspNetCore.Identity;
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
        private UserManager<ApplicationUser> _userManager;
        public ClientService(ApplicationDbContext dbContext, IMapper mapper, IGeneralConfigService generalConfig, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _generalConfig= generalConfig;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<List<ClientGetDto>> GetClients()
        {
            var clientList = await _dbContext.Clients.AsNoTracking()
                                    .ProjectTo<ClientGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return clientList;
        }
        public async Task<ClientGetDto> GetClient(Guid id)
        {
            var client = await _dbContext.Clients.Where(x => x.Id == id).AsNoTracking()
                                    .ProjectTo<ClientGetDto>(_mapper.ConfigurationProvider)
                                    .FirstOrDefaultAsync();
            return client;
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
                ImagePath = path,
                ContractEndDate= addClient.ContractEndDate,
                ContractStatus = Enum.Parse<ContractStatus>(addClient.ContractStatus)

             };
            await _dbContext.Clients.AddAsync(client);
            await _dbContext.SaveChangesAsync();
            //if (addClient.ClientContacts != null) 
            //{

            //    foreach (var contact in addClient.ClientContacts)
            //    {
            //        AddContactToClient(contact, id);

            //    }
            //}

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
                client.ContractEndDate= editClient.ContractEndDate;
                client.ContractStatus = Enum.Parse<ContractStatus>(editClient.ContractStatus);
                
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

                    Message = "Client Not Found",
                    Success = false
                };
            }

        }

        public async Task<ResponseMessage> AddContactToClient(List<AddToClientDto> addToClient)
        {
            var client = _dbContext.Clients.Find(addToClient[0].ClientId);
            if (client != null)
            {
                foreach (var addToClien in addToClient)
                {
                    ClientContact contact = new ClientContact
                    {
                        ClientId = client.Id,
                        Name = addToClien.name,
                        Position = addToClien.position,
                        PhoneNo = addToClien.phoneNo,
                        Email = addToClien.email,
                        CreatedById = client.CreatedById
                    };
                    await _dbContext.ClientContacts.AddAsync(contact);
                }
                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {

                    Message = "Clients Contacts Added Successfully",
                    Success = true
                };
            }
            else
            {
                return new ResponseMessage
                {

                    Message = "Client Not Found",
                    Success = false
                };

            }
        }
        public async Task<List<SelectListDto>> GetClientNoUser()
        {
            var users = _userManager.Users.Select(x => x.ClientId).ToList();

            var clients = await _dbContext.Clients
                .Where(e => !users.Contains(e.Id))
                .ProjectTo<SelectListDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return clients;
        }


    }
}
