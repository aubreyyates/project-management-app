import React, { useState, useEffect } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";

import Table from "./Table";
import ProjectModal from "./ProjectModal";

import authService from "components/api-authorization/AuthorizeService";

import { PROJECTS_ENDPOINT } from "routes/api";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowData, setRowData] = useState({});
  const [formType, setFormType] = useState("create");

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []); // The empty array [] ensures the effect runs once after the initial render

  const handleOpen = (formType, rowData = {}) => {
    setFormType(formType);
    setRowData(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(PROJECTS_ENDPOINT, {
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
    setRows(data);
  };

  const createRow = async (formData) => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(PROJECTS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(formData), // Convert the data to JSON
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    await fetchData();
    handleClose();
  };

  const updateRow = async (id, formData) => {
    const authToken = await authService.getAccessToken();
    const response = await fetch(PROJECTS_ENDPOINT + "/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(formData), // Convert the data to JSON
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    await fetchData();
    handleClose();
  };

  const deleteRow = (id) => {
    fetch(PROJECTS_ENDPOINT + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
            onClick={() => handleOpen("create")}
          >
            Create New Project
          </Button>
        </Grid>
        {/* row 2 */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Table rows={rows} deleteRow={deleteRow} handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <ProjectModal
        open={open}
        handleClose={handleClose}
        createRow={createRow}
        updateRow={updateRow}
        formType={formType}
        rowData={rowData}
      />
    </div>
  );
}
