using Microsoft.EntityFrameworkCore;
using ProjectManagementApp.Contracts;
using ProjectManagementApp.Data;
using ProjectManagementApp.Models;

namespace ProjectManagementApp.Services
{
    /// <summary>
    /// The NoteService class is for managing notes in the database.
    /// </summary>
    public class NoteService : INoteService
    {
        /// <summary>
        /// The database context that contains notes.
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// The constructor is where the dependency ApplicationDbContext is injected.
        /// </summary>
        /// <param name="context">The database context that contains notes.</param>
        public NoteService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Reads all notes that have the given projectId.
        /// </summary>
        /// <param name="projectId">The projectId to search with.</param>
        /// <returns>The list of notes that have the given projectId.</returns>
        public async Task<List<Note>> GetNotesWithProjectIdAsync(int projectId)
        {
            return await _context.Note
                .Where(p => p.ProjectId == projectId)
                .ToListAsync();
        }

        /// <summary>
        /// Reads the note that has the given unique identifier.
        /// </summary>
        /// <param name="noteId">The unique identifier to search with.</param>
        /// <returns>The note that has the given unique identifier if it was found; otherwise, null.</returns>
        public async Task<Note?> GetNoteWithIdAsync(int noteId)
        {
            return await _context.Note.FindAsync(noteId);
        }

        /// <summary>
        /// Creates a note with the given project model.
        /// </summary>
        /// <param name="note">The given note model.</param>
        /// <returns>The unique identifier of the newly created note.</returns>
        public async Task<int> CreateNoteAsync(Note note)
        {
            _context.Note.Add(note);
            await _context.SaveChangesAsync();
            return note.Id;
        }

        /// <summary>
        /// Updates the note with the given note model.
        /// </summary>
        /// <param name="note">The given note model.</param>
        public async Task UpdateNoteAsync(Note note)
        {
            _context.Entry(note).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes the note with the given unique identifier.
        /// </summary>
        /// <param name="noteId">The given unique identifier.</param>
        /// <returns>True if the project was found and deleted; otherwise, false.</returns>
        public async Task<bool> DeleteNoteAsync(int noteId)
        {
            var note = await _context.Note.FindAsync(noteId);
            if (note == null)
            {
                return false; // Project not found
            }

            _context.Note.Remove(note);
            await _context.SaveChangesAsync();
            return true; // Project successfully deleted
        }
    }
}
