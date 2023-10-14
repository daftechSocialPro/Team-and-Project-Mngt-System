using AutoMapper;
using AutoMapper.QueryableExtensions;
using IntegratedImplementation.Interfaces.Complaint;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.Complaint
{
    public class ComplaintService : IComplaintService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public ComplaintService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<ComplaintGetDto>> GetComplaints()
        {
            var complaints = _dbContext.Complaints.AsNoTracking()
                .ProjectTo<ComplaintGetDto>(_mapper.ConfigurationProvider).ToListAsync();
            return complaints;
        } 

    }
}
