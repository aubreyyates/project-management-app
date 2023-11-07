using ProjectManagementApp.Models.DTOs;
using ProjectManagementApp.Models.Entities;

namespace ProjectManagementApp.Extensions.Models.DTOs
{
    public static class NoteDTOExtensions
    {
        public static Note ToNote(this NoteDTO noteDTO, Note? note = null)
        {
            note ??= new Note();

            note.Content = noteDTO.Content;

            return note;
        }
    }
}
