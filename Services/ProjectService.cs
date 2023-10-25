using Microsoft.EntityFrameworkCore;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Data;
using ProjectManagementApp.Models;

namespace ProjectManagementApp.Services
{
    /// <summary>
    /// The ProjectService class is for managing projects in the database.
    /// </summary>
    public class ProjectService : IProjectService
    {
        /// <summary>
        /// The database context that contains projects.
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// The constructor is where the dependency ApplicationDbContext is injected.
        /// </summary>
        /// <param name="context">The database context that contains projects.</param>
        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Reads all projects that have the given userId.
        /// </summary>
        /// <param name="userId">The userId to search with.</param>
        /// <returns>The list of projects that have the given userId.</returns>
        public async Task<List<Project>> GetProjectsWithUserIdAsync(string userId)
        {
            return await _context.Project
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }

        /// <summary>
        /// Reads the project that has the given unique identifier.
        /// </summary>
        /// <param name="projectId">The unique identifier to search with.</param>
        /// <returns>The project that has the given unique identifier.</returns>
        public async Task<Project?> GetProjectWithIdAsync(int projectId)
        {
            return await _context.Project.FindAsync(projectId);
        }

        /// <summary>
        /// Creates a project with the given project model.
        /// </summary>
        /// <param name="project">The given project model.</param>
        /// <returns>The unique identifier of the newly created project.</returns>
        public async Task<int> CreateProjectAsync(Project project)
        {
            _context.Project.Add(project);
            await _context.SaveChangesAsync();
            return project.Id;
        }

        /// <summary>
        /// Updates the project with the given project model.
        /// </summary>
        /// <param name="project">The given project model.</param>
        public async Task UpdateProjectAsync(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes the project with the given unique identifier.
        /// </summary>
        /// <param name="projectId">The given unique identifier.</param>
        /// <returns>True if the project was found and deleted; otherwise, false.</returns>
        public async Task<bool> DeleteProjectAsync(int projectId)
        {
            var project = await _context.Project.FindAsync(projectId);
            if (project == null)
            {
                return false; // Project not found
            }

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();
            return true; // Project successfully deleted
        }
    }
}
