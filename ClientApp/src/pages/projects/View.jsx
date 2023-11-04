import React, { useState } from "react";
import MainCard from "components/MainCard";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import ContentCard from "./ContentCard";

function View({ rowData }) {
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
    </Grid>
  );
}

export default View;
