import { useState, useEffect } from "react";
import {
  getNotes as getNotesService,
  createNote as createNoteService,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService,
} from "services/noteServices";

const useNotes = (projectId) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotesService(projectId);
      setNotes(notes);
    };

    fetchData();
  }, []);

  const createNote = async (newNoteData) => {
    const newNote = await createNoteService(newNoteData, projectId); // API call to create the Note
    setNotes([...notes, newNote]); // Update the local state
  };

  const updateNote = async (noteId, updatedData) => {
    await updateNoteService(noteId, updatedData, projectId); // API call to update the Note
    let updatedNote = {
      ...updatedData,
      noteId: noteId,
    };
    setNotes(notes.map((note) => (note.id === noteId ? updatedNote : note))); // Update the local state
  };

  const deleteNote = async (noteId) => {
    await deleteNoteService(noteId, projectId); // API call to delete the Note
    setNotes(notes.filter((note) => note.id !== noteId)); // Update the local state
  };

  return [notes, createNote, updateNote, deleteNote];
};

export default useNotes;
