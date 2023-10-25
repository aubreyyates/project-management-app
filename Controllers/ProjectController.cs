using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Models;
using System.Security.Claims;

namespace ProjectManagementApp.Controllers
{
    [Authorize]
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProjectController(IProjectService projectService, IHttpContextAccessor httpContextAccessor)
        {
            _projectService = projectService;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _projectService.GetProjectsWithUserIdAsync(GetUserId());

            return Ok(projects);
        }

        // GET: api/projects/5
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

        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            project.UserId = GetUserId();

            var projectId = await _projectService.CreateProjectAsync(project);

            return CreatedAtAction("GetProject", new { id = projectId }, project);
        }

        // PUT: api/projects/5
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

        // DELETE: api/projects/5
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

        private string GetUserId()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
