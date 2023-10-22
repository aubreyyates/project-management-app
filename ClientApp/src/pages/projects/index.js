import React, { useState } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";

import Table from "./Table";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTableData = () => {
    // Fetch updated data for the table here
    // You can call the fetchData function or any other method to fetch data
    // and update the Table component's data
  };

  return (
    <div>
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2.75}
        justifyContent="space-between"
      >
        {/* row 1 */}
        <Grid item xs={10} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Projects</Typography>
        </Grid>
        <Grid item xs={2} xsOffset="auto">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="medium"
            sx={{ width: "100%" }}
            onClick={handleOpen}
          >
            Create New Project
          </Button>
        </Grid>
        {/* row 2 */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Table />
        </Grid>
      </Grid>
      <ProjectModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        updateTableData={updateTableData}
      />
    </div>
  );
};

export default Projects;
