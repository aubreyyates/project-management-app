import React, { useState, useEffect } from "react";
import MainCard from "components/MainCard";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import ContentCard from "./ContentCard";
import { NOTES_ENDPOINT } from "routes/api";
import authService from "components/api-authorization/AuthorizeService";
import Note from "./Note";

function View({ rowData }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const fetchData = async () => {
    const authToken = await authService.getAccessToken();
    console.log(NOTES_ENDPOINT + "/" + rowData.id + "/notes");
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
        {notes.map((note, index) => (
          <Grid key={index} item xs={12}>
            <Note content={note.content} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default View;
