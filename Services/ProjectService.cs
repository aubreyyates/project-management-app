using Microsoft.EntityFrameworkCore;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Data;
using ProjectManagementApp.Models;

namespace ProjectManagementApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> GetProjectsWithUserIdAsync(string userId)
        {
            return await _context.Project
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }

        public async Task<Project?> GetProjectWithIdAsync(int projectId)
        {
            return await _context.Project.FindAsync(projectId);
        }

        public async Task<int> CreateProjectAsync(Project project)
        {
            _context.Project.Add(project);
            await _context.SaveChangesAsync();
            return project.Id;
        }

        public async Task UpdateProjectAsync(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

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
