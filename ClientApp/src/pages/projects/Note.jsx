import {
  Card,
  IconButton,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useRef } from "react";

function Note({ id, content, handleDeleteClick, handleEditNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content); // Temporary state to store changes during editing
  const textFieldRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      textFieldRef.current.focus(); // Focus the TextField when Edit button is pressed
    }, 0);
  };

  const handleBlur = (event) => {
    let content = event.target.value;
    if (content === "" || content === null) {
      handleDeleteClick(id);
    } else {
      handleEditNote(content, id);
      setNoteContent(content);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let content = event.target.value;
      if (content === "" || content === null) {
        handleDeleteClick(id);
      } else {
        handleEditNote(content, id);
        setNoteContent(content);
      }
      setIsEditing(false);
    }
  };

  return (
    <Card variant="outlined">
      <Grid container xs={12}>
        <Grid item xs={11}>
          <Box p={1}>
            {isEditing ? (
              <TextField
                fullWidth
                inputRef={textFieldRef}
                defaultValue={noteContent}
                id="outlined-basic"
                variant="standard"
                onBlur={(e) => {
                  handleBlur(e);
                }} // Handle blur event
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }} // Handle key down event
              />
            ) : (
              <Typography item variant="p" color="textSecondary">
                {noteContent}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(id)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Note;
