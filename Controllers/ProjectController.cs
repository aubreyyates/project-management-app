using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Models;
using System.Security.Claims;

namespace ProjectManagementApp.Controllers
{
    /// <summary>
    /// The ProjectController class is an API controller that contains all endpoints for the projects resource.
    /// </summary>
    [Authorize]
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        /// <summary>
        /// The IProjectService dependency for managing projects.
        /// </summary>
        private readonly IProjectService _projectService;

        /// <summary>
        /// The IHttpContextAccessor for handling user information.
        /// </summary>
        private readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// The constructor is where the dependencies IProjectService, and IHttpContextAccessor are injected.
        /// </summary>
        /// <param name="projectService">The IProjectService dependency for managing projects.</param>
        /// <param name="httpContextAccessor">The IHttpContextAccessor for handling user information.</param>
        public ProjectController(IProjectService projectService, IHttpContextAccessor httpContextAccessor)
        {
            _projectService = projectService;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Retrieves all projects that are associated with the authenticated user.
        /// </summary>
        /// <returns>The list of projects as an HTTP response.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _projectService.GetProjectsWithUserIdAsync(GetUserId());

            return Ok(projects);
        }

        /// <summary>
        /// Retrieves a project with the specified ID if the user is associated with the project.
        /// </summary>
        /// <param name="id">The unique identifier of the project to retrieve.</param>
        /// <returns>The project as an HTTP response.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _projectService.GetProjectWithIdAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            return Ok(project);
        }

        /// <summary>
        /// Creates a new project and associates it with the authenticated user.
        /// </summary>
        /// <param name="project">The project to be created.</param>
        /// <returns>
        /// An HTTP response indicating the successful creation of the project with a location header pointing to the newly created resource.
        /// </returns>
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            project.UserId = GetUserId();

            var projectId = await _projectService.CreateProjectAsync(project);

            return CreatedAtAction("GetProject", new { id = projectId }, project);
        }

        /// <summary>
        /// Updates an existing project if it belongs to the authenticated user.
        /// </summary>
        /// <param name="id">The unique identifier of the project to update.</param>
        /// <param name="project">The updated project data.</param>
        /// <returns>
        /// An HTTP response indicating the success of the update or an appropriate status code 
        /// (e.g., 204 No Content, 404 Not Found, 403 Forbidden).
        /// </returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            var existingProject = await _projectService.GetProjectWithIdAsync(id);

            if (existingProject == null)
            {
                return NotFound();
            }

            if (existingProject.UserId != GetUserId())
            {
                return Forbid();
            }

            existingProject.Name = project.Name;
            existingProject.Description = project.Description;
            existingProject.Priority = project.Priority;
            existingProject.Size = project.Size;
            existingProject.PercentageComplete = project.PercentageComplete;

            await _projectService.UpdateProjectAsync(existingProject);

            return NoContent();
        }

        /// <summary>
        /// Deletes a project if it belongs to the authenticated user.
        /// </summary>
        /// <param name="id">The unique identifier of the project to delete.</param>
        /// <returns>
        /// An HTTP response indicating the success of the deletion or an appropriate status code 
        /// (e.g., 204 No Content, 404 Not Found, 403 Forbidden).
        /// </returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _projectService.GetProjectWithIdAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            var projectDeleted = await _projectService.DeleteProjectAsync(id);

            if (!projectDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        /// <summary>
        /// Returns the unique identifier of the authenticated user.
        /// </summary>
        /// <returns>The unique identifier as a string.</returns>
        private string GetUserId()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
