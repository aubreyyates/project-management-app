// Third-party library imports.
import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

// Relative imports of components/functions.
import FormFields from "../FormFields";

function CreateForm({ closeModal, createProject }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    priority: "",
    percentageComplete: "",
    userId: "",
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
    createProject(formData);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Create Project</Typography>
        </Grid>
        <FormFields formData={formData} handleInputChange={handleInputChange} />
      </Grid>
    </form>
  );
}

export default CreateForm;
