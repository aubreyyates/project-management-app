import React, { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";

function CreateForm({ handleClose, updateTableData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    priority: "",
    percentageComplete: "",
    ownerId: "1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the API to create a new project
    fetch("https://localhost:7253/api/projects", {
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
        // Handle a successful response (e.g., show a success message)
        console.log("Project created:", data);
        handleClose();
        updateTableData();
      })
      .catch((error) => {
        // Handle any errors (e.g., show an error message)
        console.error("Error creating project:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Create Project</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Priority"
            name="priority"
            type="number"
            value={formData.priority}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Size"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Percentage Complete"
            name="percentageComplete"
            type="number"
            value={formData.percentageComplete}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateForm;
