using ProjectManagementApp.Models;

namespace ProjectManagementApp.Contracts
{
    /// <summary>
    /// The INoteService provides methods for managing notes in the data store.
    /// </summary>
    public interface INoteService
    {
        /// <summary>
        /// Reads all notes that have the given projectId.
        /// </summary>
        /// <param name="projectId">The projectId to search with.</param>
        /// <returns>The list of notes that have the given projectId.</returns>
        Task<List<Note>> GetNotesWithProjectIdAsync(int projectId);

        /// <summary>
        /// Reads the note that has the given unique identifier.
        /// </summary>
        /// <param name="noteId">The unique identifier to search with.</param>
        /// <returns>The note that has the given unique identifier.</returns>
        Task<Note?> GetNoteWithIdAsync(int noteId);

        /// <summary>
        /// Creates a note with the given note model.
        /// </summary>
        /// <param name="note">The given note model.</param>
        /// <returns>The unique identifier of the newly created note.</returns>
        Task<int> CreateNoteAsync(Note note);

        /// <summary>
        /// Updates the note with the given note model.
        /// </summary>
        /// <param name="note">The given note model.</param>
        Task UpdateNoteAsync(Note note);

        /// <summary>
        /// Deletes the note with the given unique identifier.
        /// </summary>
        /// <param name="noteId">The given unique identifier.</param>
        /// <returns>True if the note was found and deleted; otherwise, false.</returns>
        Task<bool> DeleteNoteAsync(int noteId);
    }
}