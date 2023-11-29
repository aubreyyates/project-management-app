// Third-party library imports.
import { Grid, Typography } from "@mui/material";

// Relative imports of components/functions.
import ContentCard from "./ContentCard";
import NoteSection from "./notes/NoteSection";

function View({ project }) {
  let rows = [
    { title: "ID", content: project.id },
    { title: "Description", content: project.description },
    { title: "Size", content: project.size },
    { title: "Percentage Complete", content: project.percentageComplete },
    { title: "Priority", content: project.priority },
  ];
  return (
    <Grid container rowSpacing={2} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography variant="h5">Project Name: {project.name}</Typography>
      </Grid>
      {rows.map((row, index) => (
        <Grid key={index} item xs={12}>
          <ContentCard title={row.title} content={row.content} />
        </Grid>
      ))}
      <NoteSection project={project} />
    </Grid>
  );
}

export default View;
