﻿using IntegratedImplementation.DTOS.Project;
using IntegratedInfrustructure.Model.Client;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Client
{
    public class ClientGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string PhoneNo { get; set; }
        public DateTime ContractEndDate { get; set; }
        public string? ContractStatus { get; set; }
        public IFormFile? Image { get; set; } = null!;
        public string? ImagePath { get; set; } = null!;
        public List<ClientFileGetDto>? ClientFiles { get; set; }
        public List<ProjectGetDto>? Projects { get; set; }
        public List<AddToClientDto>? ClientContacts { get; set; }
    }
    public class ClientPostDto
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public string? PhoneNo { get; set; }
        public DateTime ContractEndDate { get; set; }
        public string? ContractStatus { get; set; }
        public IFormFile? Image { get; set; } = null!;
        public string? ImagePath { get; set; } = null!;
        public List<IFormFile>? ClientFiles { get; set; }
        public string? CreatedById { get; set; } = null!;
        //public List<AddToClientDto>? ClientContacts { get; set; }


    }
}
