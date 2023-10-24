﻿using Microsoft.AspNetCore.Authorization;
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
            if (id != project.Id)
            {
                return BadRequest();
            }

            // FIXME!!! Make sure to check the project that is stored in the database to make sure that it has a 
            // matching UserId. Also, make sure the user can't send a new UserId.
            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            await _projectService.UpdateProjectAsync(project);

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
