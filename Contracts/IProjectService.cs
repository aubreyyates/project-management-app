using ProjectManagementApp.Models.Entities;

namespace ProjectManagementApp.Contracts
{
    /// <summary>
    /// The IProjectService provides methods for managing projects in the data store.
    /// </summary>
    public interface IProjectService
    {
        /// <summary>
        /// Reads all projects that have the given userId.
        /// </summary>
        /// <param name="userId">The userId to search with.</param>
        /// <returns>The list of projects that have the given userId.</returns>
        Task<List<Project>> GetProjectsWithUserIdAsync(string userId);

        /// <summary>
        /// Reads the project that has the given unique identifier.
        /// </summary>
        /// <param name="projectId">The unique identifier to search with.</param>
        /// <returns>The project that has the given unique identifier.</returns>
        Task<Project?> GetProjectWithIdAsync(int projectId);

        /// <summary>
        /// Creates a project with the given project model.
        /// </summary>
        /// <param name="project">The given project model.</param>
        /// <returns>The unique identifier of the newly created project.</returns>
        Task<int> CreateProjectAsync(Project project);

        /// <summary>
        /// Updates the project with the given project model.
        /// </summary>
        /// <param name="project">The given project model.</param>
        Task UpdateProjectAsync(Project project);

        /// <summary>
        /// Deletes the project with the given unique identifier.
        /// </summary>
        /// <param name="projectId">The given unique identifier.</param>
        /// <returns>True if the project was found and deleted; otherwise, false.</returns>
        Task<bool> DeleteProjectAsync(int projectId);
    }
}
