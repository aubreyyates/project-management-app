using Microsoft.AspNetCore.Mvc;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Models;
using ProjectManagementApp.Services;

namespace ProjectManagementApp.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _projectService.GetProjectsAsync();

            return Ok(projects);
        }

        // GET: api/projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            var projectId = await _projectService.CreateProjectAsync(project);

            return CreatedAtAction("GetProject", new { id = projectId }, project);
        }

        // PUT: api/projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            await _projectService.UpdateProjectAsync(project);

            return NoContent();
        }

        // DELETE: api/projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var projectDeleted = await _projectService.DeleteProjectAsync(id);

            if (!projectDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
