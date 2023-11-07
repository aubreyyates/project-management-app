import React, { useState, useEffect, useRef } from "react";
import MainCard from "components/MainCard";
import {
  Popover,
  Button,
  Box,
  Card,
  TextField,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ContentCard from "./ContentCard";
import { NOTES_ENDPOINT } from "routes/api";
import authService from "components/api-authorization/AuthorizeService";
import Note from "./Note";
import AddIcon from "@mui/icons-material/Add";

function View({ rowData }) {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const textFieldRef = useRef(null);

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const handleAddButtonClick = () => {
    // If the user is already adding a note, save it first
    if (isAddingNote && textFieldRef.current) {
      const content = textFieldRef.current.value;
      if (content) {
        handleAddNote(content).then(() => {
          // Clear the input after adding the note
          textFieldRef.current.value = "";
          // Refocus on the TextField
          textFieldRef.current.focus();
        });
      }
    } else {
      setIsAddingNote(true);
      // We need to delay the focus until after the TextField has been rendered
      setTimeout(() => {
        textFieldRef.current.focus();
      }, 0);
    }
  };

  const handleBlur = (event) => {
    console.log("handleBlur");

    let content = event.target.value;
    if (content !== "" && content !== null) {
      handleAddNote(content);
    }
    setIsAddingNote(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let content = event.target.value;
      if (content !== "" && content !== null) {
        handleAddNote(content);
      }
      setIsAddingNote(false);
    }
  };

  const handleAddNote = async (content) => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(NOTES_ENDPOINT + "/" + rowData.id + "/notes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        projectId: rowData.id,
      }), // Convert the data to JSON
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const note = await response.json();

    setNotes([...notes, note]);
  };

  const handleEditNote = async (content, id) => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(
      NOTES_ENDPOINT + "/" + rowData.id + "/notes/" + id,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          content: content,
          projectId: rowData.id,
        }), // Convert the data to JSON
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  };

  const handleDeleteClick = async (noteId) => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(
      NOTES_ENDPOINT + "/" + rowData.id + "/notes/" + noteId,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const fetchData = async () => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(NOTES_ENDPOINT + "/" + rowData.id + "/notes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json", // Specify the content type
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    setNotes(data);
  };

  let rows = [
    { title: "ID", content: rowData.id },
    { title: "Description", content: rowData.description },
    { title: "Size", content: rowData.size },
    { title: "Percentage Complete", content: rowData.percentageComplete },
    { title: "Priority", content: rowData.priority },
  ];
  return (
    <Grid container rowSpacing={2} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography variant="h5">Project Name: {rowData.name}</Typography>
      </Grid>
      {rows.map((row, index) => (
        <Grid key={index} item xs={12}>
          <ContentCard title={row.title} content={row.content} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h5">Notes</Typography>
      </Grid>
      <Grid item xs={12}>
        {notes.map((note) => (
          <Grid key={note.id} item xs={12}>
            <Note
              id={note.id}
              content={note.content}
              handleDeleteClick={handleDeleteClick}
              handleEditNote={handleEditNote}
            />
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
          <div></div>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddButtonClick}
          fullWidth
        >
          Add Note
        </Button>
      </Grid>
    </Grid>
  );
}

export default View;
