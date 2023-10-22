import React, { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";

function CreateForm({ createRow }) {
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
    createRow(formData);
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
