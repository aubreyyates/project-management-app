import React, { useState, useEffect } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";

import Table from "./Table";
import ProjectModal from "./ProjectModal";

import { PROJECTS_ENDPOINT } from "routes/api";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []); // The empty array [] ensures the effect runs once after the initial render

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    fetch(PROJECTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error(error));
  };

  const createRow = (formData) => {
    fetch(PROJECTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(formData), // Convert the data to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        fetchData();
        handleClose();
      })
      .catch((error) => {
        // Handle any errors (e.g., show an error message)
        console.error("Error creating project:", error);
      });
  };

  const deleteRow = (id) => {
    fetch(PROJECTS_ENDPOINT + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if required
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Successful DELETE request (No Content)
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        // Handle any errors (e.g., show an error message)
        console.error("Error deleting project:", error);
      });
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
        <Grid item sm={6} md={10} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Projects</Typography>
        </Grid>
        <Grid item sm={6} md={2} xsOffset="auto">
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
          <Table rows={rows} deleteRow={deleteRow} />
        </Grid>
      </Grid>
      <ProjectModal
        open={open}
        handleClose={handleClose}
        createRow={createRow}
      />
    </div>
  );
}
