using ProjectManagementApp.Models;

namespace ProjectManagementApp.Contracts
{
    public interface IProjectService
    {
        Task<List<Project>> GetProjectsWithUserIdAsync(string userId);
        Task<Project?> GetProjectWithIdAsync(int projectId);
        Task<int> CreateProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(int projectId);
    }
}
