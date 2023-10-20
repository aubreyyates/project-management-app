// material-ui
import { Grid, Typography } from "@mui/material";
import Table from "./Table";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Projects = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Projects</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Table />
      </Grid>
    </Grid>
  );
};

export default Projects;
