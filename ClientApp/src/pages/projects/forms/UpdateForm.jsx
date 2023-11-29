// Third-party library imports.
import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

// Relative imports of components/functions.
import FormFields from "../FormFields";

function UpdateForm({ closeModal, updateProject, project }) {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    size: project.size,
    priority: project.priority,
    percentageComplete: project.percentageComplete,
    userId: project.userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { id: project.id, ...formData };
    await updateProject(project.id, data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Edit Project</Typography>
        </Grid>
        <FormFields formData={formData} handleInputChange={handleInputChange} />
      </Grid>
    </form>
  );
}

export default UpdateForm;
