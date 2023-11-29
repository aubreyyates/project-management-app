import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Note from "./Note";
import useNotes from "hooks/useNotes";

export default function NoteSection({ project }) {
  const [notes, createNote, updateNote, deleteNote] = useNotes(project.id);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const textFieldRef = useRef(null);

  const handleAddNoteButtonClick = () => {
    // If the user is already adding a note, save it first.
    if (isAddingNote && textFieldRef.current) {
      const content = textFieldRef.current.value;
      if (content) {
        createNote({ content: content });
        textFieldRef.current.value = "";
        textFieldRef.current.focus();
      }
    } else {
      setIsAddingNote(true);
      setTimeout(() => {
        textFieldRef.current.focus();
      }, 0);
    }
  };

  const handleBlur = (event) => {
    let content = event.target.value;
    if (content !== "" && content !== null) {
      createNote({ content: content });
    }
    setIsAddingNote(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let content = event.target.value;
      if (content !== "" && content !== null) {
        createNote({ content: content });
      }
      setIsAddingNote(false);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">Notes</Typography>
      </Grid>
      <Grid item xs={12}>
        {notes.map((note) => (
          <Grid key={note.id} item xs={12}>
            <Note note={note} updateNote={updateNote} deleteNote={deleteNote} />
          </Grid>
        ))}
        {isAddingNote ? (
          <Grid item xs={12}>
            <Card variant="outlined">
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <Box p={1}>
                    <TextField
                      inputRef={textFieldRef}
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      onBlur={(e) => {
                        handleBlur(e);
                      }} // Handle blur event
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                      }} // Handle key down event
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddNoteButtonClick}
          fullWidth
        >
          Add Note
        </Button>
      </Grid>
    </>
  );
}
