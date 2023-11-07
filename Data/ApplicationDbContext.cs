using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using ProjectManagementApp.Models.Entities;
using ProjectManagementApp.Models;

namespace ProjectManagementApp.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<User>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }

    public DbSet<Project> Project { get; set; } = default!;
    public DbSet<Note> Note { get; set; } = default!;
}
