using Implementation.Interfaces.Authentication;
using Implementation.Services.Authentication;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.Configuration;
using IntegratedImplementation.Services.HRM;
using IntegratedImplementation.Interfaces.Team;
using IntegratedImplementation.Services.Team;
using Microsoft.Extensions.DependencyInjection;
using IntegratedImplementation.Interfaces.Project;
using IntegratedImplementation.Services.Project;
using IntegratedImplementation.Interfaces.Task;
using IntegratedImplementation.Services.Task;
using IntegratedImplementation.Interfaces.Chat;
using IntegratedImplementation.Services.Chat;
using IntegratedImplementation.Interfaces.Notice;
using IntegratedImplementation.Services.Notice;
using IntegratedImplementation.Interfaces.Client;
using IntegratedImplementation.Services.Client;

namespace IntegratedImplementation.Datas
{
    public static class ServiceExtenstions
    {
        public static IServiceCollection AddCoreBusiness(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            //hrm services 
         
            services.AddScoped<IGeneralConfigService, GeneralConfigService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<INoticeService, NoticeService>();
            services.AddScoped<IClientService, ClientService>();
            return services;
        }
    }
}
