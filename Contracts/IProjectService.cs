using ProjectManagementApp.Models;

namespace ProjectManagementApp.Contracts
{
    public interface IProjectService
    {
        Task<List<Project>> GetProjectsAsync();
        Task<Project?> GetProjectByIdAsync(int projectId);
        Task<int> CreateProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(int projectId);
    }
}
