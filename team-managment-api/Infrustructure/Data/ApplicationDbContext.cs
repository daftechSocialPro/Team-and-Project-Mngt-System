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

