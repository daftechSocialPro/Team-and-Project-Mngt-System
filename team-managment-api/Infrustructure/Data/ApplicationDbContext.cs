using IntegratedInfrustructure.Model.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Team;
using IntegratedInfrustructure.Model.Project;
using IntegratedInfrustructure.Model.Task;
using IntegratedInfrustructure.Model.Chat;
using IntegratedInfrustructure.Model.Notice;
using IntegratedInfrustructure.Model.Client;
using IntegratedInfrustructure.Model.Complaint;

namespace IntegratedInfrustructure.Data
{

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        #region configuration

        public DbSet<CompanyProfile> CompanyProfiles { get; set; }
        public DbSet<GeneralCodes> GeneralCodes { get; set; }

        #endregion

        #region HRM


        public DbSet<EmployeeList> Employees { get; set; }
        public DbSet<HrmSetting> HrmSettings { get; set; }

        #endregion

        #region Team

        public DbSet<ProjectTeam> Teams { get; set; }  
        public DbSet<TeamEmployee> TeamEmployees { get; set; }
        public DbSet<TeamProject> TeamProjects { get; set; }

        #endregion

        #region Task

        public DbSet<TaskList> Tasks { get; set; }

        #endregion

        #region Project

        public DbSet<ProjectList> Projects { get; set; }
        public DbSet<ProjectEmployee> ProjectEmployees { get; set; }
        public DbSet<ProjectClient> ProjectClients { get; set; }

        #endregion

        #region Chat

        public DbSet<ChatList> Chats { get; set; }

        #endregion

        #region Notice
        public DbSet<NoticeList> Notices { get; set; }
        #endregion

        #region Client
        public DbSet<ClientList> Clients { get; set; }
        public DbSet<ClientFile> ClientFiles { get; set; }


        #endregion

        #region Complaint
        public DbSet<ComplaintList> Complaints { get; set; }
        public DbSet<ComplaintFile> ComplaintFiles { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
         
            modelBuilder.Entity<GeneralCodes>()
               .HasIndex(b => b.GeneralCodeType).IsUnique();


            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.HasKey(l => new { l.LoginProvider, l.ProviderKey });
            });
            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.HasKey(r => new { r.UserId, r.RoleId });
            });
            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            });

            //modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            //{
            //    entity.HasNoKey();
            //});
            //modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            //{
            //    entity.HasNoKey();
            //});
            //modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            //{
            //    entity.HasNoKey();
            //});

        }
    }
}

