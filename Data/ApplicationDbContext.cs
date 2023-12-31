﻿using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using ProjectManagementApp.Models;

namespace ProjectManagementApp.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<User>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }

    public DbSet<ProjectManagementApp.Models.Project> Project { get; set; } = default!;
    public DbSet<ProjectManagementApp.Models.Note> Note { get; set; } = default!;
}
