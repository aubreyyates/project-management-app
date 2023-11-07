using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Extensions.Models.DTOs;
using ProjectManagementApp.Models.DTOs;
using ProjectManagementApp.Models.Entities;
using System.Security.Claims;

namespace ProjectManagementApp.Controllers
{
    /// <summary>
    /// The NoteController class is an API controller that contains all endpoints for the notes resource.
    /// </summary>
    [Authorize]
    [Route("api/projects")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        /// <summary>
        /// The INoteService dependency for managing notes.
        /// </summary>
        private readonly INoteService _noteService;

        /// <summary>
        /// The IProjectService dependency for managing projects.
        /// </summary>
        private readonly IProjectService _projectService;

        /// <summary>
        /// The IHttpContextAccessor for handling user information.
        /// </summary>
        private readonly IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// The constructor is where the dependencies INoteService, IProjectService, and IHttpContextAccessor are injected.
        /// </summary>
        /// <param name="noteService">The INoteService dependency for managing notes.</param>
        /// <param name="projectService">The IProjectService dependency for managing projects.</param>
        /// <param name="httpContextAccessor">The IHttpContextAccessor for handling user information.</param>
        public NoteController(INoteService noteService, IProjectService projectService, IHttpContextAccessor httpContextAccessor)
        {
            _noteService = noteService;
            _projectService = projectService;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Retrieves all notes that are associated with the given projectId.
        /// </summary>
        /// <returns>The list of notes as an HTTP response.</returns>
        [HttpGet("{projectId}/notes")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotesWithProjectId(int projectId)
        {
            var project = await _projectService.GetProjectWithIdAsync(projectId);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            var notes = await _noteService.GetNotesWithProjectIdAsync(projectId);

            return Ok(notes);
        }

        /// <summary>
        /// Retrieves a note with the specified ID if the user is associated with the project.
        /// </summary>
        /// <param name="projectId">The unique identifier of the project the note is associated with.</param>
        /// <param name="noteId">The unique identifier of the note to retrieve.</param>
        /// <returns>The note as an HTTP response.</returns>
        [HttpGet("{projectId}/notes/{noteId}")]
        public async Task<ActionResult<Note>> GetNoteWithId(int projectId, int noteId)
        {
            var note = await _noteService.GetNoteWithIdAsync(noteId);

            if (note == null)
            {
                return NotFound();
            }

            if (note.ProjectId != projectId)
            {
                return BadRequest("The note does not belong to the specified project.");
            }

            var project = await _projectService.GetProjectWithIdAsync(note.ProjectId);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            return Ok(note);
        }

        /// <summary>
        /// Creates a new note and associates it with the project with the given projectId.
        /// </summary>
        /// <param name="projectId">The unique identifier of the project to associate the note with.</param>
        /// <param name="note">The note to be created.</param>
        /// <returns>
        /// An HTTP response indicating the successful creation of the project with a location header pointing to the newly created resource.
        /// </returns>
        [HttpPost("{projectId}/notes")]
        public async Task<ActionResult<Project>> PostNote(int projectId, NoteDTO noteDTO)
        {
            var project = await _projectService.GetProjectWithIdAsync(projectId);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            Note note = noteDTO.ToNote();
            note.ProjectId = projectId;

            var noteId = await _noteService.CreateNoteAsync(note);

            return CreatedAtAction("GetNoteWithId", new { id = noteId }, note);
        }

        /// <summary>
        /// Updates an existing note.
        /// </summary>
        /// <param name="projectId">The unique identifier of the project the note is associated with.</param>
        /// <param name="noteId">The unique identifier of the note to update.</param>
        /// <param name="note">The updated note data.</param>
        /// <returns>
        /// An HTTP response indicating the success of the update or an appropriate status code 
        /// (e.g., 204 No Content, 404 Not Found, 403 Forbidden).
        /// </returns>
        [HttpPut("{projectId}/notes/{noteId}")]
        public async Task<IActionResult> PutNote(int projectId, int noteId, NoteDTO noteDTO)
        {
            var note = await _noteService.GetNoteWithIdAsync(noteId);

            if (note == null)
            {
                return NotFound();
            }

            if (note.ProjectId != projectId)
            {
                return BadRequest("The note does not belong to the specified project.");
            }

            var project = await _projectService.GetProjectWithIdAsync(note.ProjectId);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            note = noteDTO.ToNote(note);

            await _noteService.UpdateNoteAsync(note);

            return NoContent();
        }

        /// <summary>
        /// Deletes a note.
        /// </summary>
        /// <param name="projectId">The unique identifier of the project the note is associated with.</param>
        /// <param name="noteId">The unique identifier of the note to delete.</param>
        /// <returns>
        /// An HTTP response indicating the success of the deletion or an appropriate status code 
        /// (e.g., 204 No Content, 404 Not Found, 403 Forbidden).
        /// </returns>
        [HttpDelete("{projectId}/notes/{noteId}")]
        public async Task<IActionResult> DeleteNote(int projectId, int noteId)
        {
            var note = await _noteService.GetNoteWithIdAsync(noteId);

            if (note == null)
            {
                return NotFound();
            }

            if (note.ProjectId != projectId)
            {
                return BadRequest("The note does not belong to the specified project.");
            }

            var project = await _projectService.GetProjectWithIdAsync(note.ProjectId);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != GetUserId())
            {
                return Forbid();
            }

            var noteDeleted = await _noteService.DeleteNoteAsync(noteId);

            if (!noteDeleted)
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
